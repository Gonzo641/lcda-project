"use client";
import "./ClientReviews.css";
import clientReviewsContent, { ClientReview } from "./client-reviews-content";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

const ClientReviews: React.FC = () => {
  const [activeClient, setActiveClient] = useState(0);
  const [visualClient, setVisualClient] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const clientRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reviewTextRef = useRef<HTMLHeadingElement | null>(null);
  const splitTextRef = useRef<SplitText | null>(null);
  const clientInfoRefs = useRef<HTMLDivElement[]>([]);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Calcul de la largeur dynamique pour l'item actif
  const getExpandedWidth = () => {
    if (!containerRef.current) return "10rem";

    const containerWidth = containerRef.current.offsetWidth;
    const padding = 16;
    const gap = 4;
    const inactiveItemWidth = 48;
    const inactiveItems = clientReviewsContent.length - 1;

    const remainingSpace =
      containerWidth - padding - inactiveItemWidth * inactiveItems - gap * inactiveItems;

    return `${remainingSpace}px`;
  };

  // Gestion du changement d'image fluide
  const animateImageChange = (newImageSrc: string) => {
    const container = imageContainerRef.current;
    if (!container) return;

    const newImg = document.createElement("img");
    newImg.src = newImageSrc;
    newImg.alt = "";
    newImg.style.opacity = "0";

    container.appendChild(newImg);

    return gsap.to(newImg, {
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
      onComplete: () => {
        const allImages = container.querySelectorAll("img");
        allImages.forEach((img) => {
          // ✅ On vérifie avant de supprimer pour éviter l'erreur runtime
          if (img !== newImg && container.contains(img)) {
            container.removeChild(img);
          }
        });
      },
    });
  };

  // Animation initiale d'entrée
  useEffect(() => {
    gsap.set(clientRefs.current, { width: "3rem" });
    gsap.set(clientInfoRefs.current, { opacity: 0 });

    if (clientRefs.current[0]) {
      const expandedWidth = getExpandedWidth();
      gsap.to(clientRefs.current[0], {
        width: expandedWidth,
        duration: 0.75,
        ease: "power4.inOut",
      });
    }

    if (clientInfoRefs.current[0]) {
      gsap.to(clientInfoRefs.current[0], {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    const initTimer = setTimeout(() => {
      if (reviewTextRef.current) {
        splitTextRef.current = new SplitText(reviewTextRef.current, {
          type: "lines",
          linesClass: "split-line",
        });

        if (splitTextRef.current?.lines) {
          gsap.set(splitTextRef.current.lines, { y: "110%", opacity: 0 });
          gsap.to(splitTextRef.current.lines, {
            y: "0%",
            opacity: 1,
            duration: 0.7,
            stagger: 0.05,
            ease: "power4.out",
          });
        }
      }
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (splitTextRef.current) {
        splitTextRef.current.revert();
        splitTextRef.current = null;
      }
    };
  }, []);

  // Animation du texte lors du changement de client
  useEffect(() => {
    if (!splitTextRef.current || !reviewTextRef.current) return;

    splitTextRef.current.revert();
    splitTextRef.current = new SplitText(reviewTextRef.current, {
      type: "lines",
      linesClass: "split-line",
    });

    if (splitTextRef.current?.lines) {
      gsap.set(splitTextRef.current.lines, { y: "110%", opacity: 0 });
      gsap.to(splitTextRef.current.lines, {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        stagger: 0.05,
        ease: "power4.out",
      });
    }
  }, [activeClient]);

  // Gestion du clic sur un client
  const handleClientClick = (index: number) => {
    if (index === activeClient || isAnimating) return;

    if (masterTimelineRef.current) {
      masterTimelineRef.current.kill();
    }

    setIsAnimating(true);

    const expandedWidth = getExpandedWidth();
    masterTimelineRef.current = gsap.timeline();
    const tl = masterTimelineRef.current;

    if (clientInfoRefs.current[visualClient]) {
      tl.to(clientInfoRefs.current[visualClient], {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    tl.to(clientRefs.current[activeClient], {
      width: "3rem",
      duration: 0.75,
      ease: "power4.inOut",
    }).to(clientRefs.current[index], {
      width: expandedWidth,
      duration: 0.75,
      ease: "power4.inOut",
    });

    tl.call(() => setVisualClient(index), [], 0.2);

    const imageAnimation = animateImageChange(clientReviewsContent[index].image);
    if (imageAnimation) tl.add(imageAnimation, 0);

    if (splitTextRef.current?.lines) {
      const textOutAnim = gsap.to(splitTextRef.current.lines, {
        y: "-110%",
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power4.in",
        onComplete: () => setActiveClient(index),
      });
      tl.add(textOutAnim, 0);
    } else {
      setActiveClient(index);
    }

    tl.call(() => {
      setTimeout(() => {
        setIsAnimating(false);
        masterTimelineRef.current = null;
      }, 250);
    });
  };


return (
  <div className="client-reviews">
    <div className="container">
      <div className="client-reviews-wrapper">
        <div className="client-review-content">
          <div className="client-review-img" ref={imageContainerRef}>
            <Image
              src={clientReviewsContent[activeClient].image}
              alt={clientReviewsContent[activeClient].name}
              width={800}       // ✅ valeurs recommandées
              height={800}
              quality={90}
              sizes="(max-width: 768px) 100vw, 800px"
              priority
              placeholder="blur"
              blurDataURL={clientReviewsContent[activeClient].image}
            />
          </div>

          <div className="client-review-copy">
            <h3 ref={reviewTextRef} key={activeClient}>
              {clientReviewsContent[activeClient].review}
            </h3>
          </div>
        </div>

        <div className="clients-list" ref={containerRef}>
          {clientReviewsContent.map((client: ClientReview, index: number) => (
            <div
              key={client.id}
              ref={(el) => {
                if (el) clientRefs.current[index] = el;
              }}
              className={`client-item ${index === visualClient ? "active" : ""} ${
                isAnimating ? "animating" : ""
              }`}
              onClick={() => handleClientClick(index)}
            >
              <div className="client-avatar">
                <Image
                  src={client.avatar}
                  alt={client.name}
                  width={100}     // 👈 taille adaptée aux avatars
                  height={100}
                  quality={90}
                  sizes="(max-width: 768px) 50px, 100px"
                  placeholder="blur"
                  blurDataURL={client.avatar}
                />
              </div>

              <div
                className="client-info"
                ref={(el) => {
                  if (el) clientInfoRefs.current[index] = el;
                }}
                style={{ opacity: index === visualClient ? 1 : 0 }}
              >
                <p className="client-name md">{client.name}</p>
                <p className="client-title">{client.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

};

export default ClientReviews;

