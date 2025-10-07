"use client";
import "./spaces.css";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image"; // ✅ Ajout

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import { useViewTransition } from "@/hooks/useViewTransition";

import { spacesData } from "./spaces";

gsap.registerPlugin(ScrollTrigger);

export default function SpacesPage() {
  const spacesRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerInstances = useRef<ScrollTrigger[]>([]);
  const { navigateWithTransition } = useViewTransition();

  /** ✅ Nettoyage ScrollTrigger */
  const cleanupScrollTriggers = useCallback(() => {
    scrollTriggerInstances.current.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances.current = [];
  }, []);

  /** ✅ Animation setup */
  const setupAnimations = useCallback(() => {
    cleanupScrollTriggers();
    if (!spacesRef.current) return;

    const spaces = spacesRef.current.querySelectorAll<HTMLAnchorElement>(".space");
    if (spaces.length === 0) return;

    spaces.forEach((space, index) => {
      gsap.set(space, {
        opacity: 0,
        scale: 0.75,
        y: 150,
      });

      if (index === 0) {
        gsap.to(space, {
          duration: 0.75,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          delay: 1.4,
        });
      } else {
        const trigger = ScrollTrigger.create({
          trigger: space,
          start: "top 100%",
          onEnter: () => {
            gsap.to(space, {
              duration: 0.75,
              y: 0,
              scale: 1,
              opacity: 1,
              ease: "power3.out",
            });
          },
        });
        scrollTriggerInstances.current.push(trigger);
      }
    });

    ScrollTrigger.refresh();
  }, [cleanupScrollTriggers]);

  /** ✅ useEffect sans warning ESLint */
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
    <>
      <Nav />
      <div className="page spaces">
        <section className="spaces-header">
          <div className="container">
            <div className="prop-col"></div>
            <div className="prop-col">
              <Copy delay={1}>
                <h1>Timeless Spaces</h1>
              </Copy>

              <div className="prop-filters">
                <div className="filter default">
                  <Copy delay={1}>
                    <p className="lg">All</p>
                  </Copy>
                </div>
                <div className="filter">
                  <Copy delay={1.1}>
                    <p className="lg">Residential</p>
                  </Copy>
                </div>
                <div className="filter">
                  <Copy delay={1.2}>
                    <p className="lg">Commercial</p>
                  </Copy>
                </div>
                <div className="filter">
                  <Copy delay={1.3}>
                    <p className="lg">Hospitality</p>
                  </Copy>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Liste des espaces */}
        <section className="spaces-list">
          <div className="container" ref={spacesRef}>
            {spacesData.map((space) => (
              <a
                key={space.id}
                href={space.route}
                className="space"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition(space.route);
                }}
              >
                <div className="space-img">
                  {/* ✅ Conversion en <Image /> optimisé */}
                  <Image
                    src={space.image}
                    alt={space.name}
                    width={1200}
                    height={800}
                    className="space-image"
                    priority={space.id === 1}
                  />
                </div>

                <div className="space-info">
                  <div className="prop-info-col">
                    <div className="prop-date">
                      <p>{space.date}</p>
                    </div>
                  </div>

                  <div className="prop-info-col">
                    <div className="prop-info-sub-col">
                      <div className="prop-name">
                        <h3>{space.name}</h3>
                        <p className="lg">{space.location}</p>
                      </div>
                    </div>

                    <div className="prop-info-sub-col">
                      <div className="prop-client">
                        <div className="prop-client-img">
                          {/* ✅ Conversion <img> client → <Image /> */}
                          <Image
                            src={space.clientImage}
                            alt={space.clientName}
                            width={80}
                            height={80}
                            className="client-avatar"
                          />
                        </div>
                        <div className="prop-client-name">
                          <p>{space.clientName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      <ConditionalFooter />
    </>
  );
}

