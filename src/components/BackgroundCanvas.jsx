import { memo } from 'react'

function BackgroundCanvas({ canvasRef }) {
  return <canvas id="bgCanvas" ref={canvasRef} aria-hidden="true" />
}

export default memo(BackgroundCanvas)
