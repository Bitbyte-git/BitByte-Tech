import './ChatBot.css'

export default function BotAvatar({ size = 'normal' }) {
  return (
    <span className={`bb-bot-avatar bb-bot-avatar--${size}`} aria-hidden="true">
      <img src="/assets/optimized/AI-avatar.png" alt="" loading="eager" decoding="async" />
    </span>
  )
}
