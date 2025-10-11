"use client";
import "./index.css";
import "./preloader.css";
import Image from "next/image";
import { Star, Users, Lightbulb, Puzzle, ThumbsUp, TrendingUp } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import TeamSection from "@/components/Team/Team";
import Copy from "@/components/Copy/Copy";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Services from "@/components/Services/Services";

let isInitialLoad = true;

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Home() {
  const tagsRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [showPreloader] = useState<boolean>(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState<boolean>(false);
  const lenis = useLenis();

  // À la sortie de la page → désactive le preloader pour les prochaines navigations
  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  // Stop/Start Lenis selon état du preloader
  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);

  // Animation du preloader
  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: { ease: "hop" },
    });

    if (showPreloader) {
      setLoaderAnimating(true);
      const counts = document.querySelectorAll(".count");

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(
          digits,
          { y: "0%", duration: 1, stagger: 0.075 },
          index * 1
        );

        if (index < counts.length) {
          tl.to(
            digits,
            { y: "-100%", duration: 1, stagger: 0.075 },
            index * 1 + 1
          );
        }
      });

      tl.to(".spinner", { opacity: 0, duration: 0.3 });

      tl.to(".word h1", { y: "0%", duration: 1 }, "<");

      tl.to(".divider", {
        scaleY: "100%",
        duration: 1,
        onComplete: () => {
          gsap.to(".divider", { opacity: 0, duration: 0.3, delay: 0.3 });
        },
      });

      tl.to("#word-1 h1", { y: "100%", duration: 1, delay: 0.3 });
      tl.to("#word-2 h1", { y: "-100%", duration: 1 }, "<");

      tl.to(
        ".block",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.1,
          delay: 0.75,
          onStart: () => {
            gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" });
          },
          onComplete: () => {
            gsap.set(".loader", { pointerEvents: "none" });
            setLoaderAnimating(false);
          },
        },
        "<"
      );
    }
  }, [showPreloader]);

  // Animation des tags
  useGSAP(
    () => {
      if (!tagsRef.current) return;

      const tags = tagsRef.current.querySelectorAll(".what-we-do-tag");
      gsap.set(tags, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: tagsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(tags, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: tagsRef }
  );

  // Animation des stats
  useGSAP(() => {
    if (!statsRef.current) return;

    const cards = Array.from(statsRef.current.querySelectorAll<HTMLElement>(".stat"));
    if (cards.length === 0) return;

    cards.forEach((card, i) => {
      const isRightColumn = i % 2 === 1;
      gsap.set(card, {
        x: isRightColumn ? 60 : -60,
        opacity: 0,
        transformOrigin: "center center",
        willChange: "transform, opacity",
      });
    });

    ScrollTrigger.batch(cards, {
      interval: 0.1, // groupement fluide
      start: "top 90%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          x: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: "power2.out",  // courbe plus naturelle
          overwrite: "auto",   // évite les collisions d’animations
          clearProps: "transform", // supprime la micro-saccade à la fin
        });
      },
    });
  }, { scope: statsRef });

  const stats = [
    { icon: Star, label: "Bienvenue à la Cime des Apps, votre partenaire privilégié dans le développement de solutions digitales sur-mesure." },
    { icon: ThumbsUp, label: "Nous sommes reconnus pour notre approche humaine et nos collaborations authentiques." },
    { icon: Lightbulb, label: "Ce qui nous motive est l’élaboration de solutions évolutives adaptées à vos besoins spécifiques." },
    { icon: Users, label: "Nous construisons des relations de confiance durables avec nos clients grâce à nos compétences, notre réactivité et notre engagement envers des solutions efficaces." },
    { icon: Puzzle, label: "Que votre projet implique la création d’un site vitrine, d’une plateforme e-commerce ou d’une application, nous vous guiderons à chaque étape." },
    { icon: TrendingUp, label: "À la Cime des Apps, nous sommes là pour transformer vos idées en succès digitaux." },
  ];

  return (
    <>
      {/* Preloader */}
      {/* {showPreloader && (
        <div className="loader">
          <div className="overlay">
            <div className="block"></div>
            <div className="block"></div>
          </div>
          <div className="intro-logo">
            <div className="word" id="word-1">
              <h1>
                <span>Terrene</span>
              </h1>
            </div>
            <div className="word" id="word-2">
              <h1>Balance</h1>
            </div>
          </div>
          <div className="divider"></div>
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
          <div className="counter">
            <div className="count">
              <div className="digit"><h1>0</h1></div>
              <div className="digit"><h1>0</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>2</h1></div>
              <div className="digit"><h1>7</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>6</h1></div>
              <div className="digit"><h1>5</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>9</h1></div>
              <div className="digit"><h1>8</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>9</h1></div>
              <div className="digit"><h1>9</h1></div>
            </div>
          </div>
        </div>
      )} */}

      {/* Navigation */}
      <Nav />

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <Image
            src="/home/lcda-landing.jpg"
            alt="Hero background"
            fill
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 100vw, 1920px"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={showPreloader ? 1 : 0.85}>
                <h1>LA CIME DES APPS</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy animateOnScroll={false} delay={showPreloader ? 1.15 : 1}>
                <p>
                  La simplicité est la sophistication suprême
                </p>
              </Copy>
            </div>
            <div className="hero-author">
              <Copy animateOnScroll={false} delay={showPreloader ? 1.45 : 1}>
                <p>
                  Léonard de Vinci
                </p>
              </Copy>
            </div>
            <div className="anim-btn-hero">
              <AnimatedButton
                label="Contactez-nous"
                route="/contact"
                animateOnScroll={false}
                delay={showPreloader ? 1.3 : 1.15}
              />
              <AnimatedButton
                label="Formulez votre projet"
                route="/"
                animateOnScroll={false}
                delay={showPreloader ? 1.3 : 1.15}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats (section indépendante) */}
      <section className="hero-stats-section">
        <div className="who-we-are">
          <Copy delay={0.1 * 0.05}>
            <h1 className="who-we-are-title">Qui sommes-nous ?</h1>
          </Copy>
        </div>

        <div className="container" ref={statsRef}>
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="stat">
                <div className="stat-icon">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <div className="stat-info">
                  <p>{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* Team Section */}
      <section className="featured-projects-container">
        <div className="container">
          <div className="featured-projects-header">
            <Copy delay={0.15}>
              <h2>La Team</h2>
            </Copy>
          </div>
        </div>
        <TeamSection />
      </section>

      {/* Skills Section */}
      <section className="skills-full-container">
        <div className="skills-wrapper">
          <Skills />
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-full-container">
        <div className="projects-wrapper">
          <Projects />
        </div>
      </section>

      {/* Services Section */}
      <section className="services-full-container">
        <div className="services-wrapper">
          <Services />
        </div>
      </section>
      <ConditionalFooter />
    </>
  );
}
