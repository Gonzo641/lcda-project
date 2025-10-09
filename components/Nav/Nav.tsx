"use client";
import "./Nav.css";

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import Link from "next/link";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import { useLenis } from "lenis/react";
import MenuBtn from "../MenuBtn/MenuBtn";
import { useViewTransition } from "@/hooks/useViewTransition";
import { useMenu } from "../Menu/menu-context";

gsap.registerPlugin(SplitText, CustomEase);

interface SplitTextInstance {
  revert: () => void;
  lines: HTMLElement[] | NodeListOf<HTMLElement>;
}

const Nav = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const isInitializedRef = useRef(false);
  const splitTextRefs = useRef<SplitTextInstance[]>([]);
  const lenis = useLenis();
  const { navigateWithTransition } = useViewTransition();

  const { isOpen, close } = useMenu();


  useEffect(() => {
    if (lenis) {
      if (isOpen) lenis.stop();
      else lenis.start();
    }
  }, [lenis, isOpen]);


  useLayoutEffect(() => {
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );
  }, []);

  useLayoutEffect(() => {
    if (!menuRef.current) return;
    const menu = menuRef.current;
    splitTextRefs.current.forEach((split) => split.revert());
    splitTextRefs.current = [];

    gsap.set(menu, { clipPath: "circle(0% at 50% 50%)" });

    const h2Elements = menu.querySelectorAll("h2");
    const pElements = menu.querySelectorAll("p");
    const allElements = [...h2Elements, ...pElements];

    allElements.forEach((el) => {
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
      }) as unknown as SplitTextInstance;

      const lines = Array.from(split.lines);
      gsap.set(lines, { y: "120%" });
      lines.forEach((line) => (line.style.pointerEvents = "auto"));

      splitTextRefs.current.push(split);
    });

    isInitializedRef.current = true;
  }, []);

  // ✅ Animation du menu
  const animateMenu = useCallback((open: boolean) => {
    const menu = menuRef.current;
    if (!menu) return;

    setIsAnimating(true);

    if (open) {
      document.body.classList.add("menu-open");

      gsap.to(menu, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power3.out",
        duration: 2,
        onStart: () => {
          menu.style.pointerEvents = "all";

          splitTextRefs.current.forEach((split, index) => {
            gsap.to(split.lines, {
              y: "0%",
              stagger: 0.05,
              delay: 0.35 + index * 0.1,
              duration: 1,
              ease: "power4.out",
            });
          });
        },
        onComplete: () => setIsAnimating(false),
      });
    } else {
      const tl = gsap.timeline({
        onStart: () => {
          gsap.to(menu, {
            clipPath: "circle(0% at 50% 50%)",
            ease: "power3.out",
            duration: 1,
            delay: 0.75,
            onComplete: () => {
              menu.style.pointerEvents = "none";
              splitTextRefs.current.forEach((split) =>
                gsap.set(split.lines, { y: "120%" })
              );
              document.body.classList.remove("menu-open");
              setIsAnimating(false);
              setIsNavigating(false);
            },
          });
        },
      });

      splitTextRefs.current.forEach((split, index) => {
        tl.to(
          split.lines,
          {
            y: "-120%",
            stagger: 0.03,
            delay: index * 0.05,
            duration: 1,
            ease: "power3.out",
          },
          0
        );
      });
    }
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) {
      animateMenu(isOpen);
    }
  }, [isOpen, animateMenu]);

  const handleLinkClick = useCallback(
    (href: string) => {
      const currentPath = window.location.pathname;
      if (currentPath === href) {
        if (isOpen) close();
        return;
      }
      if (isNavigating) return;
      setIsNavigating(true);
      close();
      navigateWithTransition(href);
    },
    [isNavigating, isOpen, close, navigateWithTransition]
  );


  return (
    <div>
      <div className="menu" ref={menuRef}>
        <div className="menu-wrapper">
          <div className="col col-1">
            <div className="links">
              {[
                { href: "/", label: "Home" },
                { href: "/studio", label: "Studio" },
                { href: "/spaces", label: "Our Spaces" },
                { href: "/sample-space", label: "One Installation" },
                { href: "/blueprints", label: "Blueprints" },
                { href: "/connect", label: "Connect" },
              ].map(({ href, label }) => (
                <div className="link" key={href}>
                  <Link
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(href);
                    }}
                  >
                    <h2>{label}</h2>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="col col-2">
            <div className="socials">
              <div className="sub-col">
                <div className="menu-meta menu-commissions">
                  <p>Commissions</p>
                  <p>build@terrene.studio</p>
                  <p>+1 (872) 441-2086</p>
                </div>
                <div className="menu-meta">
                  <p>Studio Address</p>
                  <p>18 Cordova Lane</p>
                  <p>Seattle, WA 98101</p>
                </div>
              </div>
              <div className="sub-col">
                <div className="menu-meta">
                  <p>Social</p>
                  <p>Instagram</p>
                  <p>Are.na</p>
                  <p>LinkedIn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;