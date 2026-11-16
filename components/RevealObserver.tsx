"use client";

import { useEffect } from "react";

/**
 * Fades in elements marked with `.reveal` as they scroll into view.
 * Content stays visible without JavaScript: the hidden starting state only
 * applies once this component has added `reveal-ready` to <html>.
 */
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    // Anything already on screen shows immediately, without animating.
    const vh = window.innerHeight;
    for (const el of items) {
      if (el.getBoundingClientRect().top < vh) el.classList.add("in-view");
      else observer.observe(el);
    }
    root.classList.add("reveal-ready");

    return () => observer.disconnect();
  }, []);

  return null;
}
