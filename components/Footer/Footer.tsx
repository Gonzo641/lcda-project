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
  RiGithubLine,
} from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const { navigateWithTransition } = useViewTransition();
  const socialIconsRef = useRef<HTMLDivElement | null>(null);

useGSAP(
  () => {
    if (!socialIconsRef.current) return;

    const icons = socialIconsRef.current.querySelectorAll<HTMLAnchorElement>(".icon");
    gsap.set(icons, { opacity: 0, x: -20 });

    const jouer = () =>
      gsap.to(icons, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });

    // Déjà visible ? On joue sans attendre
    const rect = socialIconsRef.current.getBoundingClientRect();
    const dejaVisible = rect.top <= window.innerHeight * 0.98;

    if (dejaVisible) {
      jouer();
    } else {
      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top bottom",
        once: true,
        onEnter: jouer,
      });
      ScrollTrigger.refresh();
    }
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
                  <h3 className="lg">La Cime des App</h3>
                </Copy>
              </div>
              <Copy delay={0.2}>
                <h2>"La simplicité est la sophistication suprême"</h2>
              </Copy>
              <Copy delay={0.3}>
                <p className="footer-leonard">Léonard de Vinci</p>
              </Copy>
            </div>
          </div>
        </div>

        <div className="container footer-socials">
          <div className="footer-meta-col">
            <div className="footer-socials-wrapper" ref={socialIconsRef}>
              <Link
                href={"https://www.linkedin.com/company/la-cime-des-apps/"}
                aria-label="LinkedIn" 
                className="icon">
                  <RiLinkedinBoxLine />
              </Link>
              <Link
                href={"https://github.com/JonasMouret"}
                aria-label="GitHub" 
                className="icon">
                  <RiGithubLine />
              </Link>
            </div>
          </div>

          <div className="footer-header">
            <div className="footer-logo-wrap">
              <Image
                src="/logos/lcda-logo.png"
                alt="La Cime Des Apps"
                fill
                quality={90}
                sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 20vw"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="footer-meta-col">
            <Copy delay={0.1} animateOnScroll={false}>
          <div className="footer-copyright">
            <p>&copy; 2025 La Cime Des Apps</p>
          </div>
            </Copy>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

