"use client";
import "./studio.css";

import Image from "next/image"; // ✅ Ajout
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

export default function StudioPage() {
  return (
    <>
      <Nav />
      <div className="page studio">
        {/* Hero */}
        <section className="studio-hero">
          <div className="container">
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <p>
                  We see design as more than construction. It is an ongoing
                  dialogue between people, material, and place, shaped with
                  care, and built to endure.
                </p>
              </Copy>
            </div>
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <h2>
                  Our studio exists to create spaces that feel honest, lived in,
                  and quietly transformative. Every project begins with
                  listening and ends with an environment.
                </h2>
              </Copy>
              <div className="studio-hero-hero-img">
                {/* ✅ Remplacement de <img> par <Image> optimisé */}
                <Image
                  src="/studio/about-hero.png"
                  alt="Studio hero visual"
                  width={1200}
                  height={800}
                  className="studio-hero-image"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Facts */}
        <section className="more-facts">
          <div className="container">
            <div className="more-facts-items">
              {[
                { label: "Models crafted", value: "120+" },
                { label: "Materials explored", value: "60" },
                { label: "Workshops hosted", value: "25+" },
                { label: "Hours logged", value: "3k+" },
                { label: "Prototypes built", value: "724" },
              ].map((fact, i) => (
                <div key={fact.label} className="fact">
                  <Copy delay={0.1 + i * 0.1}>
                    <p>{fact.label}</p>
                    <h2>{fact.value}</h2>
                  </Copy>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="how-we-work-container">
          <div className="container">
            <HowWeWork />
          </div>
        </section>

        {/* CTA */}
        <CTAWindow
          img="/studio/about-cta-window.jpg"
          header="The Archive"
          callout="Designs that speak through form"
          description="Each project tells a story of light, material, and rhythm. Explore how ideas take shape and grow into lasting environments."
        />

        {/* Spotlight */}
        <Spotlight />
      </div>
      <ConditionalFooter />
    </>
  );
}

