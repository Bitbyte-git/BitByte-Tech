import './ChatBot.css'

export default function BotAvatar({ size = 'normal' }) {
  const imageSize = size === 'large' ? 64 : size === 'small' ? 52 : 64

  return (
    <span className={`bb-bot-avatar bb-bot-avatar--${size}`} aria-hidden="true">
      <img
        src={`/assets/optimized/AI-avatar-enhanced.png`}
        srcSet="/assets/optimized/AI-avatar-enhanced.png 52w, /assets/optimized/AI-avatar-enhanced.png 64w"
        sizes={size === 'small' ? '30px' : '(max-width: 520px) 52px, 64px'}
        alt=""
        width={imageSize}
        height={imageSize}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
    </span>
  )
}
