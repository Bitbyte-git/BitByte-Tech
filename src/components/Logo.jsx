import { memo } from 'react'

function Logo({ height = 44, loading = 'eager', fetchPriority = 'auto' }) {
  return (
    <img 
      className="logo-img" 
      src="/assets/optimized/logo-512.png" 
      alt="Bit Byte Technologies Logo" 
      width="512"
      height="512"
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }} 
    />
  )
}

export default memo(Logo)
