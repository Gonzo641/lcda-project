"use client";
import "./Footer.css";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";
import Image from "next/image";

import { useViewTransition } from "@/hooks/useViewTransition";
import Copy from "../Copy/Copy";

import {
  RiLinkedinBoxLine,
  RiInstagramLine,
  RiDribbbleLine,
  RiYoutubeLine,
} from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const { navigateWithTransition } = useViewTransition();
  const socialIconsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;

      const icons = socialIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: -0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: socialIconsRef }
  );

  return (
    <footer className="footer">
      <div className="footer-meta">
        <div className="container footer-meta-header">
          <div className="footer-meta-col">
            <div className="footer-meta-block">
              <div className="footer-meta-logo">
                <Copy delay={0.1}>
                  <h3 className="lg">Terrene</h3>
                </Copy>
              </div>
              <Copy delay={0.2}>
                <h2>Spaces made simple, thoughtful, lasting.</h2>
              </Copy>
            </div>
          </div>

          <div className="footer-meta-col">
            <div className="footer-nav-links">
              <Copy delay={0.1}>
                {[
                  { href: "/", label: "Index" },
                  { href: "/studio", label: "Studio" },
                  { href: "/spaces", label: "Our Spaces" },
                  { href: "/sample-space", label: "One Installation" },
                  { href: "/blueprints", label: "Blueprints" },
                  { href: "/connect", label: "Connect" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateWithTransition(href);
                    }}
                  >
                    <h3>{label}</h3>
                  </Link>
                ))}
              </Copy>
            </div>
          </div>
        </div>

        <div className="container footer-socials">
          <div className="footer-meta-col">
            <div className="footer-socials-wrapper" ref={socialIconsRef}>
              <div className="icon">
                <RiLinkedinBoxLine />
              </div>
              <div className="icon">
                <RiInstagramLine />
              </div>
              <div className="icon">
                <RiDribbbleLine />
              </div>
              <div className="icon">
                <RiYoutubeLine />
              </div>
            </div>
          </div>

          <div className="footer-meta-col">
            <Copy delay={0.1}>
              <p>
                We believe design is not decoration but the quiet structure that
                shapes experience.
              </p>
            </Copy>
          </div>
        </div>
      </div>

      <div className="footer-outro">
        <div className="container">
          <div className="footer-header">
            <Image
              src="/logos/terrene-footer-logo.svg"
              alt="Terrene footer logo"
              width={300}
              height={80}
              priority
            />
          </div>

          <div className="footer-copyright">
            <p>
              Developed by — <span>Codegrid</span>
            </p>
            <p>This website is using cookies.</p>
            <p>All rights reserved &copy; 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

