import { memo } from "react";

function Logo({ height = 44, loading = "eager", fetchPriority = "auto" }) {
  return (
    <img
      className="logo-img"
      src="/assets/optimized/logo-mark-tight.png"
      alt=""
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
