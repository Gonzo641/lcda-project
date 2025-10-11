"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "./projects-data";
import "./Projects.css";
import Copy from "../Copy/Copy";
import AnimatedButton from "../AnimatedButton/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerInstances = useRef<ScrollTrigger[]>([]);

  /** Nettoyage des triggers existants */
  const cleanupScrollTriggers = useCallback(() => {
    scrollTriggerInstances.current.forEach((instance) => instance?.kill());
    scrollTriggerInstances.current = [];
  }, []);

  /** Setup des animations d’apparition */
  const setupAnimations = useCallback(() => {
    cleanupScrollTriggers();
    if (!projectsRef.current) return;

    const cards = projectsRef.current.querySelectorAll<HTMLDivElement>(".project-row");
    if (cards.length === 0) return;

    cards.forEach((card, index) => {
      // Position initiale (invisible + plus bas + plus petit)
      gsap.set(card, { opacity: 0, scale: 0.9, y: 100 });

      // Première card avec un délai fixe
      if (index === 0) {
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
        });
      } else {
        // Les suivantes : déclenchées au scroll
        const trigger = ScrollTrigger.create({
          trigger: card,
          start: "top 90%",
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            });
          },
        });
        scrollTriggerInstances.current.push(trigger);
      }
    });

    ScrollTrigger.refresh();
  }, [cleanupScrollTriggers]);

  /** Initialisation + cleanup */
  useEffect(() => {
    setupAnimations();
    const handleResize = () => setupAnimations();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanupScrollTriggers();
    };
  }, [setupAnimations, cleanupScrollTriggers]);

  return (
    <section className="projects-full">
      <Copy delay={0.15}>
        <h2 className="projects-title">Nos Réalisations Récentes</h2>
      </Copy>
      <Copy delay={0.25}>
        <p className="projects-subtitle">
          Découvrez certaines de nos réalisations les plus marquantes.
        </p>
      </Copy>
      <div className="projects-list" ref={projectsRef}>
        {projectsData.map((project, i) => (
          <div
            key={project.id}
            className={`project-row ${i % 2 === 1 ? "reverse" : ""}`}
          >
            <div className="project-row-image">
              <Image
                src={project.image}
                alt={project.title}
                width={1920}
                height={1080}
                priority={i === 0}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="project-row-content">
              <Copy delay={0.1}>
                <h3 className="project-row-title">{project.title}</h3>
              </Copy>
              <Copy delay={0.15}>
                <p className="project-row-description">{project.description}</p>
              </Copy>
              <div className="project-row-footer">
                <div>
                  <Copy delay={0.2}>
                    <span className="project-owner">{project.owner}</span>
                  </Copy>
                  <Copy delay={0.25}>
                    <p className="project-enterprise">{project.enterprise}</p>
                  </Copy>
                </div>
                <div className="project-date">
                  <Copy delay={0.2}>
                    <span className="project-date-label">{project.datetitle}</span>
                  </Copy>
                  <Copy delay={0.25}>
                    <p>{project.date}</p>
                  </Copy>
                </div>
              </div>
              <AnimatedButton
                label="Voir plus"
                route={project.url}
                animateOnScroll={false}
                delay={1.3}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;

