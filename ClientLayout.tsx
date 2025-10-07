"use client";

import { useEffect, useState, ReactNode } from "react";
import { ReactLenis } from "lenis/react";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollSettings = isMobile
    ? {
        duration: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: true,
        touchMultiplier: 1.5,
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: true,
      }
    : {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: true,
      };

  return (
    // On simule <ViewTransitions /> avec juste <div id="view-wrapper">
    <div id="view-wrapper">
      <ReactLenis root options={scrollSettings}>{children}</ReactLenis>
    </div>
  );
}



