import { useCallback, useMemo, useRef, useState } from 'react'
import BotAvatar from './BotAvatar'
import ChatWindow from './ChatWindow'
import config from './chatbotConfig.json'
import './ChatBot.css'

const rootPath = '/'

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

function detectIntent(text) {
  const normalized = text.toLowerCase()

  if (/(service|web|mobile|hrms|erp|saas|cloud|marketing|analytics)/.test(normalized)) {
    return 'services'
  }

  if (/(showcase|portfolio|project|work|case)/.test(normalized)) {
    return 'showcase'
  }

  if (/(price|pricing|cost|plan|budget|quote)/.test(normalized)) {
    return 'pricing'
  }

  if (/(contact|email|phone|call|whatsapp|team)/.test(normalized)) {
    return 'contact'
  }

  if (/(book|consult|meeting|schedule|start|demo)/.test(normalized)) {
    return 'consultation'
  }

  return 'fallback'
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

  const handleSubmitQuestion = useCallback((question) => {
    const intent = detectIntent(question)
    setMessages((current) => [...current, makeMessage('user', question)])
    addBotReply(intent)
  }, [addBotReply])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className="bb-chatbot">
      {open ? (
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
