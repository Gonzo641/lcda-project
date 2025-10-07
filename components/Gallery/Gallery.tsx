"use client";
import "./Gallery.css";
/* eslint-disable react-hooks/exhaustive-deps */
import items from "./items";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import type SplitTypeLib from "split-type";

let SplitType: typeof SplitTypeLib | null = null;

interface GalleryState {
  isDragging: boolean;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  dragVelocityX: number;
  dragVelocityY: number;
  lastDragTime: number;
  mouseHasMoved: boolean;
  visibleItems: Set<string>;
  lastUpdateTime: number;
  lastX: number;
  lastY: number;
  isExpanded: boolean;
  activeItem: HTMLDivElement | null;
  canDrag: boolean;
  originalPosition: { id: string; rect: DOMRect; imgSrc: string } | null;
  expandedItem: HTMLDivElement | null;
  activeItemId: string | null;
  titleSplit: SplitTypeLib | null;
  animationFrameId: number | null;
  introAnimationPlayed: boolean;
}

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const projectTitleRef = useRef<HTMLDivElement | null>(null);

  const [initialized, setInitialized] = useState(false);

  const stateRef = useRef<GalleryState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    dragVelocityX: 0,
    dragVelocityY: 0,
    lastDragTime: 0,
    mouseHasMoved: false,
    visibleItems: new Set(),
    lastUpdateTime: 0,
    lastX: 0,
    lastY: 0,
    isExpanded: false,
    activeItem: null,
    canDrag: true,
    originalPosition: null,
    expandedItem: null,
    activeItemId: null,
    titleSplit: null,
    animationFrameId: null,
    introAnimationPlayed: false,
  });

  const itemCount = 20;
  const itemGap = 150;
  const columns = 4;
  const itemWidth = 120;
  const itemHeight = 160;
  const masonryOffset = 125;

  /** --------------------------
   * Initialisation / nettoyage
   * -------------------------- */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cleanupGallery = useCallback(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (container) {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("touchstart", handleTouchStart);
    }
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
    window.removeEventListener("resize", handleResize);
    overlay?.removeEventListener("click", handleOverlayClick);

    const state = stateRef.current;

    if (state.animationFrameId) {
      cancelAnimationFrame(state.animationFrameId);
      state.animationFrameId = null;
    }

    if (state.expandedItem?.parentNode) {
      document.body.removeChild(state.expandedItem);
      state.expandedItem = null;
    }

    overlay?.classList.remove("active");
    state.isExpanded = false;
    state.activeItem = null;
    state.originalPosition = null;
    state.activeItemId = null;
    state.canDrag = true;

    if (state.titleSplit) {
      state.titleSplit.revert();
      state.titleSplit = null;
    }
  }, []);
// eslint-disable-next-line react-hooks/exhaustive-deps
  const initializeGallery = useCallback(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    const state = stateRef.current;

    if (state.animationFrameId) {
      cancelAnimationFrame(state.animationFrameId);
      state.animationFrameId = null;
    }

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);
    overlay.addEventListener("click", handleOverlayClick);

    updateVisibleItems();
    if (!state.animationFrameId) animate();
  }, []);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const importSplitType = async () => {
      const SplitTypeModule = await import("split-type");
      SplitType = SplitTypeModule.default;

      setTimeout(() => {
        initializeGallery();
        setInitialized(true);
      }, 10);
    };

    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    importSplitType();

    return () => cleanupGallery();
  }, [initializeGallery, cleanupGallery]);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (initialized && canvasRef.current && !stateRef.current.animationFrameId) {
      animate();
    }
  }, [initialized]);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const cleanupExpandedItem = () => closeExpandedItem();

    const onVis = () => {
      if (document.hidden) cleanupExpandedItem();
    };
    const onUnload = () => cleanupExpandedItem();

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("beforeunload", onUnload);

    return () => {
      cleanupExpandedItem();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  /** --------------------------
   * Animation et logique
   * -------------------------- */

  const animate = () => {
    const state = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (state.canDrag) {
      const ease = 0.085;
      state.currentX += (state.targetX - state.currentX) * ease;
      state.currentY += (state.targetY - state.currentY) * ease;
      canvas.style.transform = `translate3d(${state.currentX}px, ${state.currentY}px, 0)`;

      const now = Date.now();
      const dist = Math.hypot(state.currentX - state.lastX, state.currentY - state.lastY);
      const isMobile = window.innerWidth <= 1000;
      const updateThreshold = isMobile ? 100 : 80;
      const updateInterval = isMobile ? 150 : 100;

      if (dist > updateThreshold || now - state.lastUpdateTime > updateInterval) {
        updateVisibleItems();
        state.lastX = state.currentX;
        state.lastY = state.currentY;
        state.lastUpdateTime = now;
      }
    }

    state.animationFrameId = requestAnimationFrame(animate);
  };

  const updateVisibleItems = () => {
    const state = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth <= 1000;
    const buffer = isMobile ? 0.8 : 1.5;
    const viewW = window.innerWidth * (1 + buffer);
    const viewH = window.innerHeight * (1 + buffer);
    const movingRight = state.targetX > state.currentX;
    const movingDown = state.targetY > state.currentY;

    const dirBufX = movingRight ? (isMobile ? -100 : -200) : (isMobile ? 100 : 200);
    const dirBufY = movingDown ? (isMobile ? -100 : -200) : (isMobile ? 100 : 200);

    const startCol = Math.floor((-state.currentX - viewW / 2 + (movingRight ? dirBufX : 0)) / (itemWidth + itemGap));
    const endCol = Math.ceil((-state.currentX + viewW * (isMobile ? 1.0 : 1.2) + (!movingRight ? dirBufX : 0)) / (itemWidth + itemGap));
    const startRow = Math.floor((-state.currentY - viewH / 2 + (movingDown ? dirBufY : 0)) / (itemHeight + itemGap));
    const endRow = Math.ceil((-state.currentY + viewH * (isMobile ? 1.0 : 1.2) + (!movingDown ? dirBufY : 0)) / (itemHeight + itemGap));

    const current = new Set<string>();
    let created = false;

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const id = `${col},${row}`;
        current.add(id);

        if (state.visibleItems.has(id)) continue;
        if (state.activeItemId === id && state.isExpanded) continue;

        const item = document.createElement("div");
        item.className = "item";
        item.id = id;

        const isEvenRow = row % 2 === 0;
        const hOffset = isEvenRow ? masonryOffset : 0;
        item.style.left = `${col * (itemWidth + itemGap) + hOffset}px`;
        item.style.top = `${row * (itemHeight + itemGap)}px`;

        if (!state.introAnimationPlayed) gsap.set(item, { scale: 0 });

        const itemNum = (Math.abs(row * columns + col) % itemCount) + 1;
        const img = document.createElement("img");
        img.src = `/archive/archive-${itemNum}.jpg`;
        img.alt = `Image ${itemNum}`;
        item.appendChild(img);

        item.addEventListener("click", () => {
          if (state.mouseHasMoved || state.isDragging) return;
          handleItemClick(item);
        });

        canvas.appendChild(item);
        state.visibleItems.add(id);
        created = true;
      }
    }

    state.visibleItems.forEach((id) => {
      if (!current.has(id) || (state.activeItemId === id && state.isExpanded)) {
        const el = document.getElementById(id);
        if (el && canvas.contains(el)) canvas.removeChild(el);
        state.visibleItems.delete(id);
      }
    });

    // Joue l'animation d'intro si des items viennent d'être créés
  if (created && !state.introAnimationPlayed) playIntroAnimation();

  };

  /** --------------------------
 * Animation d’introduction
 * -------------------------- */
const playIntroAnimation = () => {
  const state = stateRef.current;
  const allItems = document.querySelectorAll(".item");

  if (state.introAnimationPlayed || allItems.length === 0) return;

  console.log("🎬 playIntroAnimation lancé");

  state.introAnimationPlayed = true;

gsap.to(allItems, {
  scale: 1,
  delay: 1,
  duration: 0.5,
  stagger: { amount: 1, from: "random" },
  ease: "power1.out",
});

};


  /** --------------------------
   * Gestion des interactions
   * -------------------------- */
  const handleItemClick = (item: HTMLDivElement) => {
    const state = stateRef.current;
    if (state.isExpanded) closeExpandedItem();
    else expandItem(item);
  };

  const expandItem = (item: HTMLDivElement) => {
    const state = stateRef.current;
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    state.isExpanded = true;
    state.activeItem = item;
    state.activeItemId = item.id;
    state.canDrag = false;
    container.style.cursor = "auto";

    const src = (item.querySelector("img") as HTMLImageElement).src;
    const match = src.match(/archive-(\d+)\.jpg/);
    const num = match ? parseInt(match[1], 10) : 1;
    const titleIndex = (num - 1) % items.length;
    setAndAnimateTitle(items[titleIndex]);

    const rect = item.getBoundingClientRect();
    const targetImg = (item.querySelector("img") as HTMLImageElement).src;
    state.originalPosition = { id: item.id, rect, imgSrc: targetImg };

    overlay.classList.add("active");

    const expandedItem = document.createElement("div");
    expandedItem.className = "expanded-item";
    expandedItem.style.width = `${itemWidth}px`;
    expandedItem.style.height = `${itemHeight}px`;

    const img = document.createElement("img");
    img.src = targetImg;
    expandedItem.appendChild(img);
    expandedItem.addEventListener("click", closeExpandedItem);
    document.body.appendChild(expandedItem);
    state.expandedItem = expandedItem;

    document.querySelectorAll(".item").forEach((el) => {
      if (el !== state.activeItem) {
        gsap.to(el, { opacity: 0, duration: 0.3, ease: "power2.out" });
      }
    });

    const viewportWidth = window.innerWidth;
    const isMobile = window.innerWidth <= 1000;
    const targetWidth = viewportWidth * (isMobile ? 0.75 : 0.4);
    const targetHeight = targetWidth * 1.2;

    gsap.delayedCall(0.5, animateTitleIn);

    gsap.fromTo(
      expandedItem,
      {
        width: itemWidth,
        height: itemHeight,
        x: rect.left + itemWidth / 2 - window.innerWidth / 2,
        y: rect.top + itemHeight / 2 - window.innerHeight / 2,
      },
      {
        width: targetWidth,
        height: targetHeight,
        x: 0,
        y: 0,
        duration: 1,
        ease: "hop",
      }
    );

    item.style.visibility = "hidden";
  };

  const closeExpandedItem = () => {
    const state = stateRef.current;
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!state.expandedItem || !state.originalPosition || !container || !overlay) return;

    animateTitleOut();
    overlay.classList.remove("active");
    const originalRect = state.originalPosition.rect;

    document.querySelectorAll(".item").forEach((el) => {
      if (el.id !== state.activeItemId) {
        gsap.to(el, { opacity: 1, duration: 0.5, delay: 0.5, ease: "power2.out" });
      }
    });

    const originalItem = document.getElementById(state.activeItemId!);

    gsap.to(state.expandedItem, {
      width: itemWidth,
      height: itemHeight,
      x: originalRect.left + itemWidth / 2 - window.innerWidth / 2,
      y: originalRect.top + itemHeight / 2 - window.innerHeight / 2,
      duration: 1,
      ease: "hop",
      onComplete: () => {
        if (state.expandedItem?.parentNode) document.body.removeChild(state.expandedItem);
        if (originalItem) originalItem.style.visibility = "visible";

        state.expandedItem = null;
        state.isExpanded = false;
        state.activeItem = null;
        state.originalPosition = null;
        state.activeItemId = null;
        state.canDrag = true;
        container.style.cursor = "grab";
        state.dragVelocityX = 0;
        state.dragVelocityY = 0;
      },
    });
  };

  /** --------------------------
   * Drag / touch
   * -------------------------- */
  const handleMouseDown = (e: MouseEvent) => {
    const state = stateRef.current;
    if (!state.canDrag) return;
    state.isDragging = true;
    state.mouseHasMoved = false;
    state.startX = e.clientX;
    state.startY = e.clientY;
    if (containerRef.current) containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: MouseEvent) => {
    const state = stateRef.current;
    if (!state.isDragging || !state.canDrag) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) state.mouseHasMoved = true;

    const now = Date.now();
    const dt = Math.max(10, now - state.lastDragTime);
    state.lastDragTime = now;

    state.dragVelocityX = dx / dt;
    state.dragVelocityY = dy / dt;
    state.targetX += dx;
    state.targetY += dy;
    state.startX = e.clientX;
    state.startY = e.clientY;
  };

  const handleMouseUp = () => {
    const state = stateRef.current;
    if (!state.isDragging) return;
    state.isDragging = false;

    if (state.canDrag && containerRef.current) {
      containerRef.current.style.cursor = "grab";
      if (Math.abs(state.dragVelocityX) > 0.1 || Math.abs(state.dragVelocityY) > 0.1) {
        const momentum = 200;
        state.targetX += state.dragVelocityX * momentum;
        state.targetY += state.dragVelocityY * momentum;
      }
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    const state = stateRef.current;
    if (!state.canDrag) return;
    state.isDragging = true;
    state.mouseHasMoved = false;
    state.startX = e.touches[0].clientX;
    state.startY = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    const state = stateRef.current;
    if (!state.isDragging || !state.canDrag) return;

    const dx = e.touches[0].clientX - state.startX;
    const dy = e.touches[0].clientY - state.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) state.mouseHasMoved = true;

    const mult = 1.5;
    state.targetX += dx * mult;
    state.targetY += dy * mult;
    state.startX = e.touches[0].clientX;
    state.startY = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    stateRef.current.isDragging = false;
  };

  const handleOverlayClick = () => {
    if (stateRef.current.isExpanded) closeExpandedItem();
  };

  const handleResize = () => {
    const state = stateRef.current;
    if (state.isExpanded && state.expandedItem) {
      const vw = window.innerWidth;
      const isMobile = window.innerWidth <= 768;
      const targetW = vw * (isMobile ? 0.6 : 0.4);
      const targetH = targetW * 1.2;
      gsap.to(state.expandedItem, { width: targetW, height: targetH, duration: 0.3, ease: "power2.out" });
    } else {
      updateVisibleItems();
    }
  };

/** --------------------------
 * Titre animé (robuste et typé)
 * -------------------------- */
const setAndAnimateTitle = (title: string) => {
  const state = stateRef.current;
  const projectTitleElement = projectTitleRef.current?.querySelector("p");
  if (!projectTitleElement) return;

  // Si un SplitType précédent existe, on le réinitialise proprement
  if (state.titleSplit) {
    state.titleSplit.revert();
    state.titleSplit = null;
  }

  projectTitleElement.textContent = title;

  if (SplitType) {
    state.titleSplit = new SplitType(projectTitleElement, { types: "words" });

    const words = state.titleSplit.words as HTMLElement[] | undefined;
    if (words && words.length > 0) {
      gsap.set(words, { y: "100%" });
    }
  }
};

const animateTitleIn = () => {
  const words = stateRef.current.titleSplit?.words as HTMLElement[] | undefined;
  if (!words || words.length === 0) return;

  gsap.to(words, {
    y: "0%",
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
  });
};

const animateTitleOut = () => {
  const words = stateRef.current.titleSplit?.words as HTMLElement[] | undefined;
  if (!words || words.length === 0) return;

  gsap.to(words, {
    y: "-100%",
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
  });
};
  /** --------------------------
   * Render
   * -------------------------- */
  return (
    <>
      <div className="gallery-container" ref={containerRef}>
        <div className="canvas" id="canvas" ref={canvasRef}></div>
        <div className="overlay" id="overlay" ref={overlayRef}></div>
      </div>
      <div className="project-title" ref={projectTitleRef}>
        <p></p>
      </div>
    </>
  );
}
