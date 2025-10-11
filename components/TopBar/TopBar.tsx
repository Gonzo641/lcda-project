"use client";

import "./TopBar.css";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

import { useViewTransition } from "@/hooks/useViewTransition";
import MenuBtn from "../MenuBtn/MenuBtn";
import { useMenu } from "../Menu/menu-context";

gsap.registerPlugin(ScrollTrigger);

const TopBar = () => {
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const { navigateWithTransition } = useViewTransition();
  const { isOpen, toggle } = useMenu();

  const lastScrollY = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const topBar = topBarRef.current;
    if (!topBar) return;

    const topBarHeight = topBar.offsetHeight;
    gsap.set(topBar, { y: 0 });

    const handleScroll = () => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? 1 : -1;

      if (direction === 1 && currentScrollY > 50) {
        gsap.to(topBar, { y: -topBarHeight, duration: 1, ease: "power4.out" });
      } else if (direction === -1) {
        gsap.to(topBar, { y: 0, duration: 1, ease: "power4.out" });
      }

      lastScrollY.current = currentScrollY;
      setTimeout(() => (isScrolling.current = false), 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="top-bar" ref={topBarRef}>
      <div className="top-bar-logo">
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateWithTransition("/"); // ✅ Lance la transition
          }}
        >
          <Image
            src="/logos/lcda-logo.png"
            alt="Terrene Logo"
            width={40}
            height={40}
            priority
            className="topbar-logo-img"
          />
        </Link>
      </div>

      <div className="top-bar-cta">
        {/* remplace AnimatedButton par le MenuBtn */}
        {/* <button className="menu-toggle-btn" onClick={toggle} aria-label="Ouvrir/fermer le menu"> */}
          <MenuBtn isOpen={isOpen} toggleMenu={toggle} />
        {/* </button> */}
      </div>
    </div>
  );
};

export default TopBar;