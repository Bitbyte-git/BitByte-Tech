export function navigate(href) {
  // Use history API for client-side navigation and notify app
  if (typeof window === 'undefined') return;
  const nextHref = href.startsWith('/showcase') ? href : `/showcase${href}`;
  try {
    window.history.pushState({}, '', nextHref);
    window.dispatchEvent(new Event('locationchange'));
  } catch (e) {
    // fallback to full navigation
    window.location.href = nextHref;
  }
}


