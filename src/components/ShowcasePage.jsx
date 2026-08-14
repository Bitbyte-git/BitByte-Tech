import { PROTECTED_DESTINATIONS } from "./workspaceAccess";

export default function ShowcasePage() {
  const showcaseUrl = PROTECTED_DESTINATIONS.showcase.embedUrl;

  return (
    <main className="showcase-page" aria-label="Bit Byte Technologies Showcase">
      <a
        className="showcase-home-hitbox"
        href="/"
        aria-label="Go to Bit Byte Technologies home"
      />
      <iframe
        className="showcase-frame"
        src={showcaseUrl}
        title="Bit Byte Technologies Showcase"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="fullscreen; clipboard-read; clipboard-write"
      />
    </main>
  );
}
