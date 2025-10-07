"use client";

import "./AnimatedButton.css";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IoMdArrowForward } from "react-icons/io";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface AnimatedButtonProps {
  label: string;
  route?: string;
  animate?: boolean;
  animateOnScroll?: boolean;
  delay?: number;
}

// ✅ Typage correct de SplitTextInstance (GSAP ne fournit pas d’interface officielle)
interface SplitTextInstance {
  lines: HTMLElement[] | NodeListOf<HTMLElement>;
  revert: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  label,
  route,
  animate = true,
  animateOnScroll = true,
  delay = 0,
}) => {
  const { navigateWithTransition } = useViewTransition();

  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const splitRef = useRef<SplitTextInstance | null>(null); // ✅ typé correctement

  // ✅ Typage précis de waitForFonts
  const waitForFonts = async (): Promise<boolean> => {
    try {
      // TypeScript reconnaît désormais "document.fonts"
      await document.fonts.ready;
      const customFonts = ["Manrope"];
      const fontCheckPromises = customFonts.map((fontFamily) =>
        document.fonts.check(`16px ${fontFamily}`)
      );
      await Promise.all(fontCheckPromises);
      await new Promise((resolve) => setTimeout(resolve, 100));
      return true;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return true;
    }
  };

  useGSAP(
    () => {
      if (!buttonRef.current || !textRef.current) return;

      if (!animate) {
        gsap.set(buttonRef.current, { scale: 1 });
        gsap.set(circleRef.current, { scale: 1, opacity: 1 });
        gsap.set(iconRef.current, { opacity: 1, x: 0 });
        return;
      }

      const initializeAnimation = async () => {
        await waitForFonts();

        // ✅ SplitText typé proprement
        const split = SplitText.create(textRef.current, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
          lineThreshold: 0.1,
        }) as unknown as SplitTextInstance;

        splitRef.current = split;

        gsap.set(buttonRef.current, { scale: 0, transformOrigin: "center" });
        gsap.set(circleRef.current, {
          scale: 0,
          transformOrigin: "center",
          opacity: 0,
        });
        gsap.set(iconRef.current, { opacity: 0, x: -20 });
        gsap.set(split.lines, { y: "100%", opacity: 0 });

        const tl = gsap.timeline({ delay });

        tl.to(buttonRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        })
          .to(
            circleRef.current,
            { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
            "+0.25"
          )
          .to(
            iconRef.current,
            { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
            "-0.25"
          )
          .to(
            split.lines,
            {
              y: "0%",
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power4.out",
            },
            "-=0.2"
          );

        if (animateOnScroll) {
          ScrollTrigger.create({
            trigger: buttonRef.current,
            start: "top 90%",
            once: true,
            animation: tl,
          });
        }
      };

      initializeAnimation();

      return () => {
        if (splitRef.current) splitRef.current.revert();
      };
    },
    { scope: buttonRef, dependencies: [animate, animateOnScroll, delay] }
  );

  const buttonContent = (
    <>
      <span className="circle" ref={circleRef} aria-hidden="true"></span>
      <div className="icon" ref={iconRef}>
        <IoMdArrowForward />
      </div>
      <span className="button-text" ref={textRef}>
        {label}
      </span>
    </>
  );

  if (route) {
    return (
      <a
        href={route}
        className="btn"
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        onClick={(e) => {
          e.preventDefault();
          console.log("[AnimatedButton] Click → route:", route);
          navigateWithTransition(route);
        }}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      className="btn"
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
    >
      {buttonContent}
    </button>
  );
};

export default AnimatedButton;
