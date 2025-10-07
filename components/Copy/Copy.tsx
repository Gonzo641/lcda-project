"use client";
import "./Copy.css";
import React, { useRef, ReactNode } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface CopyProps {
  children: ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
}

// Typage propre pour SplitText
interface SplitTextInstance {
  revert: () => void;
  lines: HTMLElement[];
}

const Copy: React.FC<CopyProps> = ({
  children,
  animateOnScroll = true,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementRefs = useRef<HTMLElement[]>([]);
  const splitRefs = useRef<SplitTextInstance[]>([]);
  const lines = useRef<HTMLElement[]>([]);

  // ✅ Attente du chargement des polices avant animation
  const waitForFonts = async (): Promise<boolean> => {
    try {
      await (document as Document).fonts.ready;

      const customFonts = ["Manrope"];
      const fontCheckPromises = customFonts.map((fontFamily) =>
        (document as Document).fonts.check(`16px ${fontFamily}`)
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
      if (!containerRef.current) return;

      const initializeSplitText = async () => {
        await waitForFonts();

        // Reset arrays
        splitRefs.current = [];
        lines.current = [];
        elementRefs.current = [];

        let elements: HTMLElement[] = [];
        if (containerRef.current?.hasAttribute("data-copy-wrapper")) {
          elements = Array.from(containerRef.current.children) as HTMLElement[];
        } else if (containerRef.current) {
          elements = [containerRef.current];
        }

        elements.forEach((element) => {
          elementRefs.current.push(element);

          const split = SplitText.create(element, {
            type: "lines",
            mask: "lines",
            linesClass: "line++",
            lineThreshold: 0.1,
          }) as unknown as SplitTextInstance;

          splitRefs.current.push(split);

          // ✅ Correction du text-indent
          const computedStyle = window.getComputedStyle(element);
          const textIndent = computedStyle.textIndent;

          if (textIndent && textIndent !== "0px") {
            if (split.lines.length > 0) {
              (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
            }
            element.style.textIndent = "0";
          }

          lines.current.push(...split.lines);
        });

        gsap.set(lines.current, { y: "100%" });

        const animationProps = {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay,
        };

        if (animateOnScroll) {
          gsap.to(lines.current, {
            ...animationProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              once: true,
            },
          });
        } else {
          gsap.to(lines.current, animationProps);
        }
      };

      initializeSplitText();

      // ✅ Nettoyage des SplitText au démontage
      return () => {
        splitRefs.current.forEach((split) => {
          if (split?.revert) split.revert();
        });
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  );

  // ✅ Gestion du cas unique avec un seul enfant
  if (React.Children.count(children) === 1 && React.isValidElement(children)) {
    return React.cloneElement(children, { ref: containerRef } as {
      ref: React.Ref<HTMLDivElement>;
    });
  }

  // ✅ Gestion du cas avec plusieurs enfants
  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
};

export default Copy;

