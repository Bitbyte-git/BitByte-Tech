import { memo } from 'react'

function Logo({ height = 44, loading = 'eager', fetchpriority = 'auto' }) {
  return (
    <img 
      className="logo-img" 
      src="/assets/optimized/logo-mark-tight.png" 
      alt="Bit Byte Technologies Logo" 
      width="512"
      height="361"
      loading={loading}
      decoding="async"
      fetchpriority={fetchpriority}
      style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }} 
    />
  )
}

export default memo(Logo)
