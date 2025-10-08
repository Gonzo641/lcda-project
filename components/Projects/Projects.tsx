"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import projectsData from "./projects-data";
import "./Projects.css";

function Projects() {
  return (
    <section className="projects-full">
      <h2 className="projects-title">Nos Projets</h2>
      <p className="projects-subtitle">
        Découvrez certaines de nos réalisations les plus marquantes.
      </p>

      <div className="projects-list">
        {projectsData.map((project, i) => (
          <div
            key={project.id}
            className={`project-row ${i % 2 === 1 ? "reverse" : ""}`}
          >
            {/* --- Image --- */}
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

            {/* --- Content --- */}
            <div className="project-row-content">
              <h3 className="project-row-title">{project.title}</h3>
              <p className="project-row-description">{project.description}</p>

              <div className="project-row-footer">
                <div>
                  <span className="project-owner">{project.owner}</span>
                  <p className="project-enterprise">{project.enterprise}</p>
                </div>
                <div className="project-date">
                  <span className="project-date-label">{project.datetitle}</span>
                  <p>{project.date}</p>
                </div>
              </div>

              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Voir plus
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
