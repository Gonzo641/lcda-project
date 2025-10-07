"use client";
import { useRouter } from "next/navigation";

export const useViewTransition = () => {
  const router = useRouter();

  const navigateWithTransition = (href: string) => {
    if (window.location.pathname === href) return;

    if (!("startViewTransition" in document)) {
      router.push(href);
      return;
    }

    // @ts-expect-error : pas encore typée
    const transition: ViewTransition = document.startViewTransition(async () => {
      console.log("[useViewTransition] Lancement transition vers", href);

      router.push(href);

      // ✅ On attend que le <main> change réellement
      await new Promise<void>((resolve) => {
        const main = document.querySelector("main");
        if (!main) return resolve();

        const observer = new MutationObserver(() => {
          console.log("[useViewTransition] Nouveau contenu détecté dans <main>");
          observer.disconnect();
          resolve();
        });

        observer.observe(main, { childList: true, subtree: true });
      });
    });

    transition.ready.then(() => {
      console.log("[useViewTransition] Transition prête ✅");

      // Sortie ancienne vue
      document.documentElement.animate(
        [
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(0.5)" },
        ],
        {
          duration: 2000,
          easing: "cubic-bezier(0.87, 0, 0.13, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-old(root)",
        }
      );

      // Entrée nouvelle vue
      document.documentElement.animate(
        [
          { clipPath: "circle(0% at 50% 50%)" },
          { clipPath: "circle(75% at 50% 50%)" },
        ],
        {
          duration: 2000,
          easing: "cubic-bezier(0.87, 0, 0.13, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return { navigateWithTransition, router };
};









