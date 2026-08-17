import { Suspense, lazy, useCallback, useMemo, useRef, useState } from 'react'
import BotAvatar from './BotAvatar'
import config from './chatbotConfig.json'
import './ChatBot.css'

const ChatWindow = lazy(() => import('./ChatWindow'))
const rootPath = '/'
const DEV_GROQ_CHAT_PROXY_PATH = '/__groq-chat'

function makeMessage(sender, text, extras = {}) {
  return {
    id: `${sender}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    sender,
    text,
    ...extras,
  }
}

function waitForElement(id, attempts = 20) {
  return new Promise((resolve) => {
    const existing = document.getElementById(id)
    if (existing) {
      resolve(existing)
      return
    }

    let count = 0
    const interval = window.setInterval(() => {
      const element = document.getElementById(id)
      count += 1

      if (element || count >= attempts) {
        window.clearInterval(interval)
        resolve(element)
      }
    }, 120)
  })
}

function getChatApiUrl() {
  const apiUrl = (
    import.meta.env.VITE_GROQ_API_URL ||
    import.meta.env.VITE_CHAT_API_URL ||
    '/api/chat'
  ).trim()

  if (import.meta.env.DEV && /^https?:\/\//i.test(apiUrl)) {
    return DEV_GROQ_CHAT_PROXY_PATH
  }

  return apiUrl
}

async function getAiReply(message) {
  const response = await fetch(getChatApiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || 'Unable to reach BitByte AI')
  }

  return data.reply || config.fallbackMessage
}

async function scrollToSection(target) {
  if (!target) return

  const targetId = target.replace('#', '')
  const isRootPage = window.location.pathname.replace(/\/$/, '') === ''

  if (!isRootPage && ['services', 'showcase', 'pricing', 'contact', 'contact-form'].includes(targetId)) {
    window.location.href = `${rootPath}#${targetId}`
    return
  }

  const element = await waitForElement(targetId)
  if (!element) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  element.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })

  if (window.history?.replaceState) {
    window.history.replaceState(null, '', `#${targetId}`)
  }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(() => [
    makeMessage('bot', config.welcomeMessage),
  ])
  const [typing, setTyping] = useState(false)
  const replyTimeoutRef = useRef(0)

  const actions = useMemo(() => config.quickActions, [])

  const addBotReply = useCallback((intent) => {
    window.clearTimeout(replyTimeoutRef.current)
    setTyping(true)

    replyTimeoutRef.current = window.setTimeout(() => {
      const response = config.responses[intent]
      const botMessage = response
        ? makeMessage('bot', response.text, {
            cta: response.cta,
            email: response.email,
            phone: response.phone,
          })
        : makeMessage('bot', config.fallbackMessage)

      setMessages((current) => [...current, botMessage])
      setTyping(false)
    }, 720)
  }, [])

  const handleQuickAction = useCallback((intent) => {
    const action = config.quickActions.find((item) => item.id === intent)
    setMessages((current) => [
      ...current,
      makeMessage('user', action?.userText || action?.label || 'Tell me more'),
    ])
    addBotReply(intent)
  }, [addBotReply])

  const handleSubmitQuestion = useCallback(async (question) => {
    window.clearTimeout(replyTimeoutRef.current)
    setMessages((current) => [...current, makeMessage('user', question)])
    setTyping(true)

    try {
      const reply = await getAiReply(question)
      setMessages((current) => [...current, makeMessage('bot', reply)])
    } catch {
      setMessages((current) => [
        ...current,
        makeMessage(
          'bot',
          'I am having trouble connecting right now. Please use the buttons below for pricing, showcases, or booking a consultation.',
        ),
      ])
    } finally {
      setTyping(false)
    }
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className="bb-chatbot">
      {open ? (
        <Suspense fallback={null}>
          <ChatWindow
            actions={actions}
            messages={messages}
            onActionClick={scrollToSection}
            onClose={handleClose}
            onMinimize={handleClose}
            onQuickAction={handleQuickAction}
            onSubmitQuestion={handleSubmitQuestion}
            typing={typing}
          />
        </Suspense>
      ) : (
        <button
          className="bb-chat-launcher"
          type="button"
          aria-label="Open BitByte AI Assistant"
          onClick={handleOpen}
        >
          <BotAvatar size="large" />
          <span className="bb-chat-online" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
