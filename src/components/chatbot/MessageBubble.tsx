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
            <a href={`mailto:${message.email}`} title="Open link">{message.email}</a>
          </div>
        )}
        {message.phone && (
          <div className="bb-chat-contact">
            <span>{message.phone.toLowerCase().includes('whatsapp') ? 'WhatsApp (Only):' : 'Phone:'}</span>
            {message.phone.toLowerCase().includes('whatsapp') ? (
              <a
                href={`https://wa.me/${message.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
               title="Open link">
                {message.phone}
              </a>
            ) : (
              <a href={`tel:${message.phone.replace(/[^+\d]/g, '')}`} title="Open link">{message.phone}</a>
            )}
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
