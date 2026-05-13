import { memo } from 'react'

function Cursor({ cursorRef, magnifierContentRef, magnifierRef, ringRef }) {
  return (
    <>
      <div id="cursor" ref={cursorRef} aria-hidden="true" />
      <div id="cursor-ring" ref={ringRef} aria-hidden="true">
        <span />
      </div>
      <div id="text-magnifier" ref={magnifierRef} aria-hidden="true">
        <div id="text-magnifier-content" ref={magnifierContentRef} />
      </div>
    </>
  )
}

export default memo(Cursor)
