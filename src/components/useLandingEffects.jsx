import { useEffect } from "react";

export default function useLandingEffects({ setNavStuck }) {
  useEffect(() => {
    let navIsStuck = window.scrollY > 50;
    let scrollFrame = 0;
    setNavStuck(navIsStuck);

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" },
    );

    const observeNewReveals = () => {
      document.querySelectorAll(".reveal:not(.observed)").forEach((element) => {
        element.classList.add("observed");
        revealObserver.observe(element);
      });
    };

    observeNewReveals();
    const mutationObserver = new MutationObserver(observeNewReveals);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const onScroll = () => {
      if (scrollFrame) return;

      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const nextStuck = window.scrollY > 50;

        if (nextStuck !== navIsStuck) {
          navIsStuck = nextStuck;
          setNavStuck(nextStuck);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(scrollFrame);
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [setNavStuck]);
}
