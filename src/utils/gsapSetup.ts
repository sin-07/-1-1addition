"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered only once on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Configure GSAP defaults
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });
}

/**
 * Magnetic button helper: attracts button towards mouse cursor
 */
export function applyMagneticEffect(element: HTMLElement, intensity: number = 0.35) {
  if (!element) return () => {};

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * intensity,
      y: y * intensity,
      rotateX: -y * 0.05,
      rotateY: x * 0.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1.2, 0.4)",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
}

export { gsap, ScrollTrigger };
