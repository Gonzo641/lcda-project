// "use client";
// import "./FeaturedProjects.css";

// import teamContent, { Team } from "./featured-projects-content";
// import { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import AnimatedButton from "../AnimatedButton/AnimatedButton";
// import Copy from "@/components/Copy/Copy";


// const TeamSection: React.FC = () => {
//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const featuredProjectCards = gsap.utils.toArray(".featured-project-card") as HTMLElement[];

//     featuredProjectCards.forEach((featuredProjectCard, index) => {
//       if (index < featuredProjectCards.length - 1) {
//         const featuredProjectCardInner = featuredProjectCard.querySelector(
//           ".featured-project-card-inner"
//         ) as HTMLElement | null;

//         if (!featuredProjectCardInner) return;

//         const isMobile = window.innerWidth <= 1000;

//         gsap.fromTo(
//           featuredProjectCardInner,
//           {
//             y: "0%",
//             z: 0,
//             rotationX: 0,
//           },
//           {
//             y: "-50%",
//             z: -250,
//             rotationX: 45,
//             scrollTrigger: {
//               trigger: featuredProjectCards[index + 1],
//               start: isMobile ? "top 85%" : "top 100%",
//               end: "top -75%",
//               scrub: true,
//               pin: featuredProjectCard,
//               pinSpacing: false,
//             },
//           }
//         );

//         gsap.to(featuredProjectCardInner, {
//           "--after-opacity": 1,
//           scrollTrigger: {
//             trigger: featuredProjectCards[index + 1],
//             start: "top 75%",
//             end: "top 0%",
//             scrub: true,
//           },
//         });
//       }
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div className="featured-projects">
//       {teamContent.map((project: Team, index: number) => (
//         <div key={index} className="featured-project-card">
//           <div className="featured-project-card-inner">
//             <div className="featured-project-card-content">
//               {/* <div className="featured-project-card-info">
//                 <p>{project.info}</p>
//               </div> */}
//               <div className="featured-project-card-content-main">
//                 <div className="featured-project-card-title">
//                   <Copy delay={0.1}>
//                   <h2>{project.name}</h2>
//                   </Copy>
//                 </div>
//                 <div className="featured-project-card-title">
//                   <Copy delay={0.15}>
//                   <h3>{project.status}</h3>
//                   </Copy>
//                 </div>
//                 <div className="featured-project-card-description">
//                   <Copy delay={0.2}>
//                   <p className="lg">{project.description}</p>
//                   </Copy>
//                 </div>
//                   {project.url && project.url.trim() !== "" && project.url !== "#" && (
//                     <AnimatedButton
//                       label="Discover More"
//                       route={project.url}
//                       animateOnScroll={true}
//                       delay={0.2}
//                     />
//                   )}
//               </div>
//             </div>
//             <div className="featured-project-card-img">
//               <Image
//                 src={project.image}
//                 alt={project.name}
//                 width={1920}
//                 height={1080}
//                 quality={90}
//                 priority={index === 0}
//                 placeholder="blur"
//                 blurDataURL={project.image}
//               />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TeamSection;


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
    const mm = gsap.matchMedia();

    const featuredProjectCards = gsap.utils.toArray(".featured-project-card") as HTMLElement[];

    featuredProjectCards.forEach((featuredProjectCard, index) => {
      if (index < featuredProjectCards.length - 1) {
        const featuredProjectCardInner = featuredProjectCard.querySelector(
          ".featured-project-card-inner"
        ) as HTMLElement | null;

        if (!featuredProjectCardInner) return;

        // Desktop Animation (> 1024px)
        mm.add("(min-width: 1025px)", () => {
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
                start: "top 80%", // Plus ce chiffre est bas, plus la carte reste fixe longtemps
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
        });

        // Mobile Animation (<= 1024px)
        // On garde l'animation mais on enlève le 'pin' pour éviter de bloquer le scroll
        mm.add("(max-width: 1024px)", () => {
          gsap.fromTo(
            featuredProjectCardInner,
            {
              y: "0%",
              z: 0,
              rotationX: 0,
            },
            {
              y: "-20%", // Mouvement réduit sur mobile
              z: -100,   // Profondeur réduite
              rotationX: 30, // Rotation réduite
              scrollTrigger: {
                trigger: featuredProjectCards[index + 1],
                start: "top 90%",
                end: "top 0%",
                scrub: true,
                pin: false, // Pas de pin sur mobile pour permettre le scroll complet
              },
            }
          );

          gsap.to(featuredProjectCardInner, {
            "--after-opacity": 1,
            scrollTrigger: {
              trigger: featuredProjectCards[index + 1],
              start: "top 85%",
              end: "top 20%",
              scrub: true,
            },
          });
        });
      }
    });

    return () => {
      mm.revert();
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
