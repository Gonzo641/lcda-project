"use client";

import React, { useRef } from "react";
import Image, { ImageProps } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type RevealImageProps = Omit<ImageProps, "className"> & {
  /** Délai optionnel avant l'anim (en secondes) */
  delay?: number;
  /** Active/désactive l’anim au scroll (sinon joue au montage) */
  animateOnScroll?: boolean;
  /** Décalage Y initial (px) */
  yFrom?: number;
  /** Classe appliquée au wrapper (cercle blanc, ombre, etc.) */
  wrapperClassName?: string;
  /** Classe appliquée à l’<img> interne de Next */
  imgClassName?: string;
};

export default function RevealImage({
  delay = 0,
  animateOnScroll = true,
  yFrom = 16,
  wrapperClassName,
  imgClassName,
  ...imgProps
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current;

      // état initial
      gsap.set(el, { autoAlpha: 0, y: yFrom });

      if (animateOnScroll) {
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              delay,
            });
          },
        });

        return () => st.kill();
      } else {
        const tween = gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay,
        });
        return () => {
          tween.kill();
          gsap.killTweensOf(el);
        };
      }
    },
    { scope: ref, dependencies: [delay, animateOnScroll, yFrom] }
  );

  return (
    <div ref={ref} className={wrapperClassName}>
      <Image {...imgProps} className={imgClassName} alt="image" />
    </div>
  );
}
