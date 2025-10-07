"use client";
import "./Spotlight.css";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Spotlight = () => {
  const spotlightRef = useRef<HTMLElement | null>(null);
  const titlesContainerRef = useRef<HTMLDivElement | null>(null);
  const imagesContainerRef = useRef<HTMLDivElement | null>(null);
  const spotlightHeaderRef = useRef<HTMLDivElement | null>(null);
  const titlesContainerElementRef = useRef<HTMLDivElement | null>(null);

  // refs qui contiennent des tableaux d’éléments
  const introTextElementsRef = useRef<HTMLDivElement[]>([]);
  const imageElementsRef = useRef<HTMLDivElement[]>([]);
  const titleElementsRef = useRef<NodeListOf<HTMLHeadingElement> | []>([]);
  // const currentActiveIndexRef = useRef<number>(0);

  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // configuration
  const config = {
    gap: 0.08,
    speed: 0.3,
    arcRadius: 500,
  };

  const spotlightItems = [
    { name: "Courtyard Stillness", img: "/spotlight/spotlight-img-1.jpg" },
    { name: "Blue Horizon", img: "/spotlight/spotlight-img-2.jpg" },
    { name: "Stone Quiet", img: "/spotlight/spotlight-img-3.jpg" },
    { name: "Amber Niche", img: "/spotlight/spotlight-img-4.jpg" },
    { name: "Earthen Shelf", img: "/spotlight/spotlight-img-5.jpg" },
    { name: "Reflective White", img: "/spotlight/spotlight-img-6.jpg" },
    { name: "Desert Edge", img: "/spotlight/spotlight-img-7.jpg" },
    { name: "Soft Passage", img: "/spotlight/spotlight-img-8.jpg" },
    { name: "Water Column", img: "/spotlight/spotlight-img-9.jpg" },
    { name: "Golden Retreat", img: "/spotlight/spotlight-img-10.jpg" },
  ];



  useEffect(() => {
    const initializeSpotlight = (): boolean => {
      const titlesContainer = titlesContainerRef.current;
      const imagesContainer = imagesContainerRef.current;
      const spotlightHeader = spotlightHeaderRef.current;
      const titlesContainerElement = titlesContainerElementRef.current;

      if (!titlesContainer || !imagesContainer || !spotlightHeader || !titlesContainerElement) {
        return false;
      }

      titlesContainer.innerHTML = "";
      imagesContainer.innerHTML = "";
      imageElementsRef.current.length = 0;

      spotlightItems.forEach((item, index) => {
        const titleElement = document.createElement("h1");
        titleElement.textContent = item.name;
        if (index === 0) titleElement.style.opacity = "1";
        titlesContainer.appendChild(titleElement);

        const imgWrapper = document.createElement("div");
        imgWrapper.className = "spotlight-img";
        const imgElement = document.createElement("img");
        imgElement.src = item.img;
        imgElement.alt = "";
        imgWrapper.appendChild(imgElement);
        imagesContainer.appendChild(imgWrapper);
        imageElementsRef.current.push(imgWrapper);
      });

      const titleElements = titlesContainer.querySelectorAll<HTMLHeadingElement>("h1");
      titleElementsRef.current = titleElements;

      return titleElements.length > 0;
    };

    let initialized = initializeSpotlight();

    if (!initialized) {
      const initInterval = setInterval(() => {
        initialized = initializeSpotlight();
        if (initialized) clearInterval(initInterval);
      }, 10);

      setTimeout(() => clearInterval(initInterval), 2000);
    }

    if (!initialized) return;

    const titlesContainer = titlesContainerRef.current!;
    const spotlightHeader = spotlightHeaderRef.current!;
    const titlesContainerElement = titlesContainerElementRef.current!;
    const introTextElements = introTextElementsRef.current;
    const imageElements = imageElementsRef.current;
    const titleElements = titleElementsRef.current;
    let currentActiveIndex = 0;

    const containerWidth = window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;
    const arcStartX = containerWidth - 220;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;
    const arcControlPointX = arcStartX + config.arcRadius;
    const arcControlPointY = containerHeight / 2;

    const getBezierPosition = (t: number) => {
      const x =
        (1 - t) * (1 - t) * arcStartX +
        2 * (1 - t) * t * arcControlPointX +
        t * t * arcStartX;
      const y =
        (1 - t) * (1 - t) * arcStartY +
        2 * (1 - t) * t * arcControlPointY +
        t * t * arcEndY;
      return { x, y };
    };

    const getImgProgressState = (index: number, overallProgress: number) => {
      const startTime = index * config.gap;
      const endTime = startTime + config.speed;
      if (overallProgress < startTime) return -1;
      if (overallProgress > endTime) return 2;
      return (overallProgress - startTime) / config.speed;
    };

    imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `+=${window.innerHeight * 10}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress <= 0.2) {
          const animationProgress = progress / 0.2;
          const moveDistance = window.innerWidth * 0.6;
          gsap.set(introTextElements[0], { x: -animationProgress * moveDistance, opacity: 1 });
          gsap.set(introTextElements[1], { x: animationProgress * moveDistance, opacity: 1 });

          gsap.set(".spotlight-bg-img", { transform: `scale(${animationProgress})` });
          gsap.set(".spotlight-bg-img img", { transform: `scale(${1.5 - animationProgress * 0.5})` });

          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
          spotlightHeader.style.opacity = "0";
          gsap.set(titlesContainerElement, { "--before-opacity": "0", "--after-opacity": "0" });
        } else if (progress > 0.2 && progress <= 0.25) {
          gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
          gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });
          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });
          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
          spotlightHeader.style.opacity = "1";
          gsap.set(titlesContainerElement, { "--before-opacity": "1", "--after-opacity": "1" });
        } else if (progress > 0.25 && progress <= 0.95) {
          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });
          spotlightHeader.style.opacity = "1";
          gsap.set(titlesContainerElement, { "--before-opacity": "1", "--after-opacity": "1" });

          const switchProgress = (progress - 0.25) / 0.7;
          const viewportHeight = window.innerHeight;
          const titlesContainerHeight = titlesContainer.scrollHeight;
          const startPosition = viewportHeight;
          const targetPosition = -titlesContainerHeight;
          const totalDistance = startPosition - targetPosition;
          const currentY = startPosition - switchProgress * totalDistance;

          gsap.set(".spotlight-titles", { transform: `translateY(${currentY}px)` });

          imageElements.forEach((img, index) => {
            const imageProgress = getImgProgressState(index, switchProgress);
            if (imageProgress < 0 || imageProgress > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imageProgress);
              gsap.set(img, { x: pos.x - 100, y: pos.y - 75, opacity: 1 });
            }
          });

          // mise à jour du titre actif
          const viewportMiddle = viewportHeight / 2;
          let closestIndex = 0;
          let closestDistance = Infinity;

          titleElements.forEach((title, index) => {
            const rect = title.getBoundingClientRect();
            const titleCenter = rect.top + rect.height / 2;
            const distance = Math.abs(titleCenter - viewportMiddle);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });

          if (closestIndex !== currentActiveIndex) {
            titleElements[currentActiveIndex].style.opacity = "0.35";
            titleElements[closestIndex].style.opacity = "1";
            const bgImg = document.querySelector<HTMLImageElement>(".spotlight-bg-img img");
            if (bgImg) bgImg.src = spotlightItems[closestIndex].img;
            currentActiveIndex = closestIndex;
          }
        } else if (progress > 0.95) {
          spotlightHeader.style.opacity = "0";
          gsap.set(titlesContainerElement, { "--before-opacity": "0", "--after-opacity": "0" });
        }
      },
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
    // ✅ dépendances figées
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 




  
  return (
    <section className="spotlight" ref={spotlightRef}>
      <div className="spotlight-inner">
        <div className="spotlight-intro-text-wrapper">
          <div className="spotlight-intro-text" ref={(el) => { if (el) introTextElementsRef.current[0] = el; }}>
            <p>Beneath</p>
          </div>
          <div className="spotlight-intro-text" ref={(el) => { if (el) introTextElementsRef.current[1] = el; }}>
            <p>Beyond</p>
          </div>
        </div>
        <div className="spotlight-bg-img">
          {/* <img src="/spotlight/spotlight-img-1.jpg" alt="spotlight background" /> */}
          
          <Image
            src="/spotlight/spotlight-img-1.jpg"
            alt="spotlight background"
            fill // ou width / height si pas de position absolue
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority // pour l’image principale si c’est le hero
          />
        </div>
      </div>
      <div className="spotlight-titles-container" ref={titlesContainerElementRef}>
        <div className="spotlight-titles" ref={titlesContainerRef}></div>
      </div>
      <div className="spotlight-images" ref={imagesContainerRef}></div>
      <div className="spotlight-header" ref={spotlightHeaderRef}>
        <p>Discover</p>
      </div>
      <div className="spotlight-outline"></div>
    </section>
  );
};

export default Spotlight;
