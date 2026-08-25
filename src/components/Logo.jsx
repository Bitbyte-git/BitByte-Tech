import { memo } from "react";

function Logo({ height = 44, loading = "eager", fetchPriority = "auto" }) {
  const renderedWidth = Math.ceil(height * (256 / 180));

  return (
    <img
      className="logo-img"
      src="/assets/optimized/logo-mark-tight-80.png"
      srcSet="/assets/optimized/logo-mark-tight-80.png 80w, /assets/optimized/logo-mark-tight-96.png 96w, /assets/optimized/logo-mark-tight-112.png 112w"
      sizes={`${renderedWidth}px`}
      alt="Bit Byte Technologies logo"
      width="256"
      height="180"
      loading={loading}
      decoding="async"
      fetchpriority={fetchPriority}
      style={{ height: `${height}px`, width: "auto", objectFit: "contain" }}
    />
  );
}

export default memo(Logo);
