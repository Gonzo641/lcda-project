"use client";
import "./FeaturedProjects.css";

import teamContent, { Team } from "./featured-projects-content";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import Copy from "@/components/Copy/Copy";


const TeamSection: React.FC = () => {
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
      {teamContent.map((project: Team, index: number) => (
        <div key={index} className="featured-project-card">
          <div className="featured-project-card-inner">
            <div className="featured-project-card-content">
              {/* <div className="featured-project-card-info">
                <p>{project.info}</p>
              </div> */}
              <div className="featured-project-card-content-main">
                <div className="featured-project-card-title">
                  <Copy delay={0.1}>
                  <h2>{project.name}</h2>
                  </Copy>
                </div>
                <div className="featured-project-card-title">
                  <Copy delay={0.15}>
                  <h3>{project.status}</h3>
                  </Copy>
                </div>
                <div className="featured-project-card-description">
                  <Copy delay={0.2}>
                  <p className="lg">{project.description}</p>
                  </Copy>
                </div>
                  {project.url && project.url.trim() !== "" && project.url !== "#" && (
                    <AnimatedButton
                      label="Discover More"
                      route={project.url}
                      animateOnScroll={true}
                      delay={0.2}
                    />
                  )}
              </div>
            </div>
            <div className="featured-project-card-img">
              <Image
                src={project.image}
                alt={project.name}
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

export default TeamSection;

