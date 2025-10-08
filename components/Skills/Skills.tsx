"use client";

import React from "react";
import Link from "next/link";
import skillsData from "./skills-data";
import "./Skills.css";
import Copy from "@/components/Copy/Copy";
import RevealImage from "@/components/RevealImage/RevealImage"; // ← importe le nouveau composant

function Skills() {
  return (
    <section className="skills-section">
      <Copy delay={0.1}>
        <h2 className="skills-title">Nos Compétences</h2>
      </Copy>

      <Copy delay={0.2}>
        <p className="skills-subtitle">
          Nous utilisons les dernières technologies pour créer des applications performantes et évolutives.
        </p>
      </Copy>

      <div className="skills-grid">
        {skillsData.map((skill, i) => (
          <Link
            key={skill.id}
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            className="skill-item"
          >
            {/* ✅ Animation GSAP dédiée aux images */}
            <RevealImage
              src={skill.image}
              alt={skill.name}
              width={120}
              height={120}
              priority={false}
              delay={0.3 * (i % 4)}         
              animateOnScroll={true}
              yFrom={16}
              wrapperClassName="skill-image-wrapper"
              imgClassName="skill-image"
            />

            {/* ✅ Le nom reste animé par Copy (SplitText) */}
            <Copy delay={0.4}>
              <p className="skill-name">{skill.name}</p>
            </Copy>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Skills;
