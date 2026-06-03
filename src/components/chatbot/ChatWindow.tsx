import { useEffect, useRef, useState } from 'react'
import ChatHeader from './ChatHeader'
import MessageBubble from './MessageBubble'
import QuickActions from './QuickActions'

export default function ChatWindow({
  actions,
  messages,
  onActionClick,
  onClose,
  onMinimize,
  onQuickAction,
  onSubmitQuestion,
  typing,
}) {
  const [question, setQuestion] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, typing])

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = question.trim()
    if (!trimmed) return
    onSubmitQuestion(trimmed)
    setQuestion('')
  }

  return (
    <section className="bb-chat-window" aria-label="BitByte AI Assistant">
      <ChatHeader onClose={onClose} onMinimize={onMinimize} />
      <div className="bb-chat-log" ref={scrollRef} aria-live="polite">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} onAction={onActionClick} />
        ))}
        {typing && (
          <div className="bb-chat-message is-bot">
            <div className="bb-typing" aria-label="Assistant is typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>
      <QuickActions actions={actions} onSelect={onQuickAction} />
      <form className="bb-chat-input" onSubmit={handleSubmit}>
        <input
          aria-label="Ask BitByte AI Assistant"
          autoComplete="off"
          placeholder="Ask about services, pricing, contact..."
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </section>
  )
}
