import BotAvatar from './BotAvatar'

export default function ChatHeader({ onClose, onMinimize }) {
  return (
    <div className="bb-chat-header">
      <div className="bb-chat-title-wrap">
        <BotAvatar size="small" />
        <div>
          <h2>BitByte AI Assistant</h2>
          <div className="bb-chat-status">
            <span aria-hidden="true" />
            <strong>Online</strong>
          </div>
          <p>Ask me anything about our services.</p>
        </div>
      </div>
      <div className="bb-chat-window-actions">
        <button type="button" aria-label="Minimize assistant" onClick={onMinimize}>
          −
        </button>
        <button type="button" aria-label="Close assistant" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  )
}
