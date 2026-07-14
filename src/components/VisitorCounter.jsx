import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const VISIT_COUNTED_KEY = "website-visit-counted";
const VISIT_COUNTED_VALUE = "counted";
const VISIT_LOCK_PREFIX = "pending:";
const VISIT_LOCK_TTL_MS = 15_000;
const DEV_VISITOR_COUNTER_PROXY_PATH = "/__visitor-counter";

let visitorCounterRequest = null;

function getVisitorApiUrl() {
  const apiUrl = (import.meta.env.VITE_VISITOR_COUNTER_API || "").trim();

  if (import.meta.env.DEV && /^https?:\/\//i.test(apiUrl)) {
    return DEV_VISITOR_COUNTER_PROXY_PATH;
  }

  return apiUrl;
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
  const count =
    typeof responsePayload?.count === "string"
      ? Number(responsePayload.count)
      : responsePayload?.count;

  if (
    !responsePayload ||
    responsePayload.success !== true ||
    typeof count !== "number" ||
    !Number.isFinite(count)
  ) {
    throw new Error("Invalid visitor counter response");
  }

  return count;
}

async function requestVisitorCount(apiUrl) {
  const visitStatus = getVisitStatus();
  const shouldIncrement = visitStatus === "new";

  if (shouldIncrement) {
    setVisitLock();
  }

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
    if (shouldIncrement) {
      clearVisitLock();
    }

    throw error;
  }
}

function loadVisitorCount(apiUrl) {
  if (!visitorCounterRequest) {
    visitorCounterRequest = requestVisitorCount(apiUrl).finally(() => {
      visitorCounterRequest = null;
    });
  }

  return visitorCounterRequest;
}

export default function VisitorCounter() {
  const [status, setStatus] = useState("loading");
  const [count, setCount] = useState(null);

  useEffect(() => {
    const apiUrl = getVisitorApiUrl();
    let isMounted = true;

    if (!apiUrl) {
      setStatus("error");
      return undefined;
    }

    setStatus("loading");

    loadVisitorCount(apiUrl)
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
  }, []);

  const displayText =
    status === "success" && typeof count === "number"
      ? count.toLocaleString()
      : "Unavailable";

  return (
    <div
      className="inline-flex min-h-10 w-full max-w-[220px] items-center gap-3 rounded-full border border-cyan-300/15 bg-white/[0.035] px-4 py-2 text-left shadow-[0_0_24px_rgba(0,164,236,0.08)] sm:w-auto"
      aria-label={
        status === "success"
          ? `Total Visits ${count.toLocaleString()}`
          : "Total Visits unavailable"
      }
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/10 text-cyan-300">
        <Eye size={15} strokeWidth={2.2} aria-hidden="true" />
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
