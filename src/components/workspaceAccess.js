const UNIVERSAL_ACCESS_CODE = "Bitbyte@1";

export const ACCESS_CODES = {
  showcase: UNIVERSAL_ACCESS_CODE,
  hrms: UNIVERSAL_ACCESS_CODE,
  billing: UNIVERSAL_ACCESS_CODE,
};

// Frontend-only access checks are convenience gates, not real security.
// Anyone can inspect bundled JavaScript or modify sessionStorage in DevTools.
// Use backend or serverless validation before protecting production data.
export const PROTECTED_DESTINATIONS = {
  showcase: {
    name: "showcase",
    label: "Showcase",
    storageKey: "showcaseAccess",
    route: "/showcase",
    accessRoute: "/access/showcase",
    embedUrl: "https://bitbyte-showcase-web.vercel.app/",
    redirectUrl: "",
    openInNewTab: false,
    internalRoute: true,
    code: ACCESS_CODES.showcase,
  },
  hrms: {
    name: "hrms",
    label: "HRMS Login",
    storageKey: "hrmsAccess",
    route: "/hrms",
    accessRoute: "/access/hrms",
    redirectUrl: "https://bitbyte-lemon.vercel.app/login",
    openInNewTab: false,
    code: ACCESS_CODES.hrms,
  },
  billing: {
    name: "billing",
    label: "Billing",
    storageKey: "billingAccess",
    route: "/billing",
    accessRoute: "/access/billing",
    redirectUrl: "https://bit-byte-billing-client.vercel.app",
    openInNewTab: false,
    code: ACCESS_CODES.billing,
  },
};

const ACCESS_VALUE = "granted";

const canUseSessionStorage = () =>
  typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";

export const getProtectedDestination = (destination) =>
  PROTECTED_DESTINATIONS[destination] || null;

export const getDestinationByRoute = (pathname) =>
  Object.values(PROTECTED_DESTINATIONS).find(
    (destination) => destination.route === pathname,
  )?.name || null;

export const getDestinationByAccessRoute = (pathname) =>
  Object.values(PROTECTED_DESTINATIONS).find(
    (destination) => destination.accessRoute === pathname,
  )?.name || null;

export const hasAccess = (destination) => {
  const config = getProtectedDestination(destination);
  if (!config || !canUseSessionStorage()) return false;
  return window.sessionStorage.getItem(config.storageKey) === ACCESS_VALUE;
};

export const grantAccess = (destination) => {
  const config = getProtectedDestination(destination);
  if (!config || !canUseSessionStorage()) return;
  window.sessionStorage.setItem(config.storageKey, ACCESS_VALUE);
};

export const revokeAccess = (destination) => {
  const config = getProtectedDestination(destination);
  if (!config || !canUseSessionStorage()) return;
  window.sessionStorage.removeItem(config.storageKey);
};

export const revokeAllAccess = () => {
  if (!canUseSessionStorage()) return;
  Object.values(PROTECTED_DESTINATIONS).forEach((destination) => {
    window.sessionStorage.removeItem(destination.storageKey);
  });
};
