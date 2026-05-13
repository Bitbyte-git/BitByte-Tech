import { memo } from 'react'

function Cursor({ cursorRef, ringRef }) {
  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}

export default memo(Cursor)
