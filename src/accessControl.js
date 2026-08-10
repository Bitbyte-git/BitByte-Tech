export const ACCESS_CODES = {
  showcase: "SHOWCASE_SECRET",
  hrms: "HRMS_SECRET",
  billing: "BILLING_SECRET",
};

export const PROTECTED_DESTINATIONS = {
  showcase: {
    key: "showcase",
    name: "Showcase",
    storageKey: "showcaseAccess",
    route: "/showcase",
    redirectUrl: "/showcase",
    title: "Secure Showcase Access",
    subtitle: "Authorized Showcase Access Only",
    code: ACCESS_CODES.showcase,
  },
  hrms: {
    key: "hrms",
    name: "HRMS Login",
    storageKey: "hrmsAccess",
    route: "/hrms",
    redirectUrl: "https://bitbyte-lemon.vercel.app/login",
    title: "Secure Employee Access",
    subtitle: "Authorized Employees Only",
    code: ACCESS_CODES.hrms,
  },
  billing: {
    key: "billing",
    name: "Billing",
    storageKey: "billingAccess",
    route: "/billing",
    redirectUrl: "https://bit-byte-billing-client.vercel.app",
    title: "Secure Billing Access",
    subtitle: "Authorized Finance Access Only",
    code: ACCESS_CODES.billing,
  },
};

const ACCESS_VALUE = "granted";

export function getProtectedDestination(destination) {
  return PROTECTED_DESTINATIONS[destination] || null;
}

// Frontend-only protection is not real security. Users can inspect bundled
// JavaScript and modify sessionStorage. Use backend/serverless validation
// before relying on these gates for production protection.
export function hasAccess(destination) {
  const config = getProtectedDestination(destination);
  if (!config || typeof window === "undefined") return false;

  try {
    return window.sessionStorage.getItem(config.storageKey) === ACCESS_VALUE;
  } catch {
    return false;
  }
}

export function grantAccess(destination) {
  const config = getProtectedDestination(destination);
  if (!config || typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(config.storageKey, ACCESS_VALUE);
  } catch {
    // sessionStorage may be unavailable in some privacy modes.
  }
}

export function revokeAccess(destination) {
  const config = getProtectedDestination(destination);
  if (!config || typeof window === "undefined") return;

  try {
    window.sessionStorage.removeItem(config.storageKey);
  } catch {
    // Nothing to revoke when sessionStorage is blocked.
  }
}

export function revokeAllAccess() {
  Object.keys(PROTECTED_DESTINATIONS).forEach(revokeAccess);
}

export function destinationForPath(pathname) {
  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  if (normalizedPath === "/showcase" || normalizedPath.startsWith("/showcase/")) {
    return "showcase";
  }
  if (normalizedPath === "/hrms") return "hrms";
  if (normalizedPath === "/billing") return "billing";
  return null;
}
