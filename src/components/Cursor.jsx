import { memo } from 'react'

function Cursor({ cursorRef, ringRef }) {
  return (
    <>
      <div id="cursor" ref={cursorRef} aria-hidden="true" />
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}

export default memo(Cursor)
