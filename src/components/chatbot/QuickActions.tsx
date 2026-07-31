export default function QuickActions({ actions, onSelect }) {
  return (
    <div className="bb-quick-actions" aria-label="Chat quick actions">
      {actions.map((action) => (
        <button
          className="bb-quick-action"
          key={action.id}
          type="button"
          onClick={() => onSelect(action.id)}
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}
