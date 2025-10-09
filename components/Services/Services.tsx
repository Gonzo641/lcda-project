"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "./services-data"; // ⬅️ named export
import Link from "next/link";
import "./Services.css";
import Copy from "../Copy/Copy";

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");

      cards.forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 60, scale: 0.98 });

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
              delay: i * 0.05,
            });
          },
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-section">
      <Copy delay={0.15}>
        <h2 className="services-title">Nos Services</h2>
      </Copy>
      <Copy delay={0.25}>
        <p className="services-subtitle">
          Voici les différents services que nous proposons, n’hésitez pas à nous
          contacter si vous avez des questions.
        </p>
      </Copy>

      <div className="services-grid" ref={gridRef}>
        {servicesData.map(({ id, title, description, icon: Icon, url }) => (
          <div key={id} className="service-card">
            <div className="service-icon" aria-hidden="true">
              <Icon size={40} color="#CBA6F7" />
            </div>
            <Copy delay={0.25}>
              <h3 className="service-title">{title}</h3>
            </Copy>
            <Copy delay={0.35}>
              <p className="service-description">{description}</p>
            </Copy>

            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="service-link"
              aria-label={`En savoir plus sur ${title}`}
            >
              Voir plus
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;



