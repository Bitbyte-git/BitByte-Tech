import './ChatBot.css'

export default function BotAvatar({ size = 'normal' }) {
  return (
    <span className={`bb-bot-avatar bb-bot-avatar--${size}`} aria-hidden="true">
      <img src="/assets/optimized/AI-avatar.png" alt="" width="192" height="192" loading="eager" decoding="async" />
    </span>
  )
}
