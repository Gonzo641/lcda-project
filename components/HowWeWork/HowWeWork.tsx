"use client";
import "./HowWeWork.css";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Copy from "../Copy/Copy";

gsap.registerPlugin(ScrollTrigger);

const HowWeWork = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(
    () => {
      if (!stepsRef.current) return;
      const steps = stepsRef.current.querySelectorAll<HTMLElement>(".how-we-work-step");
      gsap.set(steps, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: "top 75%",
        once: true,
        animation: gsap.to(steps, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: -0.1,
          ease: "none",
        }),
      });
    },
    { scope: stepsRef }
  );

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    if (!container || !header || !cards) return;

    if (!isMobile) {
      const mainTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        endTrigger: cards,
        end: "bottom bottom",
        pin: header,
        pinSpacing: false,
      });
      scrollTriggersRef.current.push(mainTrigger);

      const cardElements = cards.querySelectorAll<HTMLElement>(".how-we-work-card");
      cardElements.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
          onLeave: () => {
            if (index < cardElements.length - 1) setActiveStep(index + 1);
          },
          onLeaveBack: () => {
            if (index > 0) setActiveStep(index - 1);
          },
        });
        scrollTriggersRef.current.push(cardTrigger);
      });
    }

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [isMobile]);

  const steps = [
    {
      img: "/how-we-work/process-1.jpg",
      title: "Discovery / Context",
      text: "We begin with listening and study. Site, climate, and daily routines inform the brief so we can define aims, constraints, and measures of success with clarity.",
    },
    {
      img: "/how-we-work/process-2.jpg",
      title: "Principles / Direction",
      text: "We set guiding principles for light, massing, and flow. Quick models and diagrams test options and reveal the direction that best serves the brief.",
    },
    {
      img: "/how-we-work/process-3.jpg",
      title: "Detail / Coordination",
      text: "We develop drawings and specifications across structure, services, and joinery. Materials and samples are reviewed in natural light while budget and timeline stay in view.",
    },
    {
      img: "/how-we-work/process-4.jpg",
      title: "Build / Handover",
      text: "We oversee construction with care and precision. After final review and finishing, we hand over a space that is ready to live in, complete with guidance for long term care.",
    },
  ];

  return (
    <div className="how-we-work" ref={containerRef}>
      <div className="how-we-work-col how-we-work-header" ref={headerRef}>
        <div className="container">
          <div className="how-we-work-header-content">
            <div className="how-we-work-header-callout">
              <Copy delay={0.1}>
                <p>Process in focus</p>
              </Copy>
            </div>
            <Copy delay={0.15}>
              <h3>
                From first sketches to final details, our process is shaped to bring clarity and rhythm
              </h3>
            </Copy>
            <div className="how-we-work-steps" ref={stepsRef}>
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`how-we-work-step ${activeStep === index ? "active" : ""}`}
                >
                  <p className="how-we-work-step-label">Step</p>
                  <p className="how-we-work-step-index">{index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="how-we-work-col how-we-work-cards" ref={cardsRef}>
        {steps.map((step, i) => (
          <div className="how-we-work-card" key={i}>
            <div className="how-we-work-card-img">
              <Image
                src={step.img}
                alt={step.title}
                width={1920}
                height={1080}
                priority={i === 0}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="how-we-work-card-copy">
              <div className="how-we-work-card-index-label">
                <h3>{step.title}</h3>
              </div>
              <p className="md">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWeWork;


