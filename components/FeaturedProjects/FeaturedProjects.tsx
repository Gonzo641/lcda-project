"use client";
import "./FeaturedProjects.css";

import featuredProjectsContent, { FeaturedProject } from "./featured-projects-content";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const FeaturedProjects: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const featuredProjectCards = gsap.utils.toArray(".featured-project-card") as HTMLElement[];

    featuredProjectCards.forEach((featuredProjectCard, index) => {
      if (index < featuredProjectCards.length - 1) {
        const featuredProjectCardInner = featuredProjectCard.querySelector(
          ".featured-project-card-inner"
        ) as HTMLElement | null;

        if (!featuredProjectCardInner) return;

        const isMobile = window.innerWidth <= 1000;

        gsap.fromTo(
          featuredProjectCardInner,
          {
            y: "0%",
            z: 0,
            rotationX: 0,
          },
          {
            y: "-50%",
            z: -250,
            rotationX: 45,
            scrollTrigger: {
              trigger: featuredProjectCards[index + 1],
              start: isMobile ? "top 85%" : "top 100%",
              end: "top -75%",
              scrub: true,
              pin: featuredProjectCard,
              pinSpacing: false,
            },
          }
        );

        gsap.to(featuredProjectCardInner, {
          "--after-opacity": 1,
          scrollTrigger: {
            trigger: featuredProjectCards[index + 1],
            start: "top 75%",
            end: "top 0%",
            scrub: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="featured-projects">
      {featuredProjectsContent.map((project: FeaturedProject, index: number) => (
        <div key={index} className="featured-project-card">
          <div className="featured-project-card-inner">
            <div className="featured-project-card-content">
              <div className="featured-project-card-info">
                <p>{project.info}</p>
              </div>
              <div className="featured-project-card-content-main">
                <div className="featured-project-card-title">
                  <h2>{project.title}</h2>
                </div>
                <div className="featured-project-card-description">
                  <p className="lg">{project.description}</p>
                </div>
              </div>
            </div>
            <div className="featured-project-card-img">
              <Image
                src={project.image}
                alt={project.title}
                width={1920}
                height={1080}
                quality={90}
                priority={index === 0}
                placeholder="blur"
                blurDataURL={project.image}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProjects;

