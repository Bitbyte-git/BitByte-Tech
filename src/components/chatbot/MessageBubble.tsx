import BotAvatar from './BotAvatar'

export default function MessageBubble({ message, onAction }) {
  const isBot = message.sender === 'bot'

  return (
    <div className={`bb-chat-message ${isBot ? 'is-bot' : 'is-user'}`}>
      {isBot && <BotAvatar size="small" />}
      <div className="bb-chat-bubble">
        <p>{message.text}</p>
        {message.email && (
          <div className="bb-chat-contact">
            <span>Email:</span>
            <a href={`mailto:${message.email}`}>{message.email}</a>
          </div>
        )}
        {message.phone && (
          <div className="bb-chat-contact">
            <span>Phone:</span>
            <a href={`tel:${message.phone.replace(/[^+\d]/g, '')}`}>{message.phone}</a>
          </div>
        )}
        {message.cta && (
          <button
            className="bb-chat-cta"
            type="button"
            onClick={() => onAction(message.cta.target)}
          >
            {message.cta.label}
          </button>
        )}
      </div>
    </div>
  )
}
