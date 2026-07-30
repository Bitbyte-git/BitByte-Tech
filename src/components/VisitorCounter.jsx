import { useEffect, useRef, useState } from "react";

const VISIT_COUNTED_KEY = "website-visit-counted";
const VISIT_COUNTED_VALUE = "counted";
const VISIT_LOCK_PREFIX = "pending:";
const VISIT_LOCK_TTL_MS = 15_000;
const VISITOR_COUNTER_API_PATH = "/api/visitor-counter";
const DEV_VISITOR_COUNTER_PROXY_PATH = "/__visitor-counter";

let visitorCounterRequest = null;

function EyeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function getVisitorApiUrls() {
  const apiUrl = (import.meta.env.VITE_VISITOR_COUNTER_API || "").trim();

  if (import.meta.env.PROD) {
    return [VISITOR_COUNTER_API_PATH, apiUrl].filter(Boolean);
  }

  if (import.meta.env.DEV && /^https?:\/\//i.test(apiUrl)) {
    return [DEV_VISITOR_COUNTER_PROXY_PATH];
  }

  return [apiUrl || VISITOR_COUNTER_API_PATH];
}

function getVisitStatus() {
  try {
    const value = window.sessionStorage.getItem(VISIT_COUNTED_KEY);

    if (value === VISIT_COUNTED_VALUE) return "counted";
    if (value?.startsWith(VISIT_LOCK_PREFIX)) {
      const lockedAt = Number.parseInt(value.replace(VISIT_LOCK_PREFIX, ""), 10);
      const lockIsFresh =
        Number.isFinite(lockedAt) && Date.now() - lockedAt < VISIT_LOCK_TTL_MS;

      if (lockIsFresh) return "pending";

      window.sessionStorage.removeItem(VISIT_COUNTED_KEY);
    }
  } catch {
    return "new";
  }

  return "new";
}

function setVisitLock() {
  try {
    window.sessionStorage.setItem(
      VISIT_COUNTED_KEY,
      `${VISIT_LOCK_PREFIX}${Date.now()}`,
    );
  } catch {
    // sessionStorage can be unavailable in some privacy modes.
  }
}

function markVisitCounted() {
  try {
    window.sessionStorage.setItem(VISIT_COUNTED_KEY, VISIT_COUNTED_VALUE);
  } catch {
    // The API count remains valid even if the browser blocks sessionStorage.
  }
}

function clearVisitLock() {
  try {
    if (window.sessionStorage.getItem(VISIT_COUNTED_KEY) !== VISIT_COUNTED_VALUE) {
      window.sessionStorage.removeItem(VISIT_COUNTED_KEY);
    }
  } catch {
    // Nothing to clear when sessionStorage is unavailable.
  }
}

function parseVisitorResponse(payload) {
  const responsePayload =
    typeof payload?.body === "string" ? JSON.parse(payload.body) : payload;
  const rawCount =
    responsePayload?.count ??
    responsePayload?.value ??
    responsePayload?.visits ??
    responsePayload?.views ??
    responsePayload?.total;
  const count = typeof rawCount === "string" ? Number(rawCount) : rawCount;

  if (
    !responsePayload ||
    typeof count !== "number" ||
    !Number.isFinite(count)
  ) {
    throw new Error("Invalid visitor counter response");
  }

  return count;
}

async function requestVisitorCount(apiUrls) {
  const visitStatus = getVisitStatus();
  const shouldIncrement = visitStatus === "new";
  const urls = Array.isArray(apiUrls) ? apiUrls : [apiUrls];

  if (shouldIncrement) {
    setVisitLock();
  }

  try {
    let lastError = null;

    for (const apiUrl of urls) {
      if (!apiUrl) continue;

      try {
        const response = await fetch(apiUrl, {
          method: shouldIncrement ? "POST" : "GET",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Visitor counter request failed: ${response.status}`);
        }

        const count = parseVisitorResponse(await response.json());

        if (shouldIncrement) {
          markVisitCounted();
        }

        return count;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("Visitor counter URL is not configured");
  } catch (error) {
    if (shouldIncrement) {
      clearVisitLock();
    }

    throw error;
  }
}

function loadVisitorCount(apiUrls) {
  if (!visitorCounterRequest) {
    visitorCounterRequest = requestVisitorCount(apiUrls).finally(() => {
      visitorCounterRequest = null;
    });
  }

  return visitorCounterRequest;
}

export default function VisitorCounter() {
  const counterRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("idle");
  const [count, setCount] = useState(null);

  useEffect(() => {
    const counter = counterRef.current;

    if (!counter) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "180px 0px" },
    );

    observer.observe(counter);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return undefined;

    const apiUrls = getVisitorApiUrls();
    let isMounted = true;

    if (apiUrls.length === 0) {
      setStatus("error");
      return undefined;
    }

    setStatus("loading");

    loadVisitorCount(apiUrls)
      .then((nextCount) => {
        if (!isMounted) return;
        setCount(nextCount);
        setStatus("success");
      })
      .catch(() => {
        if (!isMounted) return;
        setCount(null);
        setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, [visible]);

  const displayText =
    status === "success" && typeof count === "number"
      ? count.toLocaleString()
      : "Restricted";

  return (
    <div
      ref={counterRef}
      className="inline-flex min-h-10 w-full max-w-[220px] items-center gap-3 rounded-full border border-cyan-300/15 bg-white/[0.035] px-4 py-2 text-left shadow-[0_0_24px_rgba(0,164,236,0.08)] sm:w-auto"
      aria-label={
        status === "success"
          ? `Total Visits ${count.toLocaleString()}`
          : "Total Visits unavailable"
      }
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/10 text-cyan-300">
        <EyeIcon />
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="font-[var(--f-label)] text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-white/45">
          Total Visits
        </span>
        {status === "loading" ? (
          <span className="h-3 w-20 animate-pulse rounded-full bg-white/15" />
        ) : (
          <span
            className={`font-[var(--f-label)] text-sm font-extrabold leading-none ${
              status === "success" ? "text-[#a4ec70]" : "text-white/35"
            }`}
          >
            {displayText}
          </span>
        )}
      </span>
    </div>
  );
}
