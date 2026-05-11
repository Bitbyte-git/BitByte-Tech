export default function Logo({ idPrefix = 'logo', height = 44 }) {
  return (
    <img 
      className="logo-img" 
      src="/assets/BB-Logo.png" 
      alt="Bit Byte Technologies Logo" 
      style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }} 
    />
  )
}
