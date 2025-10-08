// export interface FeaturedProject {
//   info: string;
//   title: string;
//   description: string;
//   image: string;
// }
export interface FeaturedProject {
  name: string;
  status: string;
  description: string;
  image: string;
  url: string;
}

const featuredProjectsContent: FeaturedProject[] = [
  // {
  //   info: "An immersive lounge built around a central tree",
  //   title: "Sanctum Hall",
  //   description:
  //     "Circular seating, arched openings, and natural textures create a serene gathering space. The design balances monumentality with intimacy, framing nature as the focal point.",
  //   image: "/featured-projects/featured-work-1.jpg",
  // },
  // {
  //   info: "A private retreat defined by water and sun",
  //   title: "Desert Poolhouse",
  //   description:
  //     "Soft stucco walls, a lone palm, and an open sky bring elemental simplicity. The still surface of the pool becomes both mirror and threshold, blurring enclosure and openness.",
  //   image: "/featured-projects/featured-work-2.jpg",
  // },
  // {
  //   info: "A cloister-inspired courtyard with generous arches",
  //   title: "Arcade Residence",
  //   description:
  //     "Rhythmic colonnades and layered seating zones encourage calm gatherings. Textured stone and filtered light evoke both permanence and ease, rooted in classical geometry.",
  //   image: "/featured-projects/featured-work-3.jpg",
  // },
  // {
  //   info: "A refined interior anchored by symmetry and light",
  //   title: "Atrium Gallery",
  //   description:
  //     "A quiet procession of columns and a sculptural centerpiece guide the eye toward framed views. Warm plaster walls and soft daylight create a setting of contemplative elegance.",
  //   image: "/featured-projects/featured-work-4.jpg",
  // },
  {
    name: "Jonas",
    status: "Co-Founder & Développeur Fullstack",
    description:
      "Passionné de technologies depuis toujours, je suis constamment en quête d’apprentissage afin de rester à l’affût des nouveautés dans mon domaine. Ce qui me motive, c’est l’élaboration de solutions logicielles de haute qualité en collaboration avec des profils multidisciplinaires.",
    image: "/featured-projects/jonas.jpg",
    url: "https://www.linkedin.com/in/jonas-mouret/",
  },
  {
    name: "Kevin",
    status: "Co-Founder & Business Developer",
    description:
      "Business Developer depuis 2014, je suis passionné par les projets bien pensés et bien réalisés. J’aime transformer les idées en solutions concrètes en conjuguant stratégie, innovation et sens du concret. Curieux de nature et profondément travailleur, j’accompagne nos clients de l’idée à la réalisation, en assurant un lien fluide entre vos besoins et notre savoir-faire technique.",
    image: "/featured-projects/keke.jpg",
    url: "https://www.linkedin.com/in/kevin-caillot-01a84654/",
  },
  {
    name: "Corto",
    status: "Développeur Fullstack",
    description:
      "Fort d'une expérience de 3 années en tant que lead developpeur dans une entreprise de commerce international je me lance à mon compte en 2021. Objectif, prendre le temps de réaliser les projets de mes clients selon leurs envies et sans contraintes. Travailler à échelle humaine et proposer des disponibilités, tarifs et vitesse de production défiant toute concurrence. Création de site internet, outils de communications, applications sur mesure, logiciels, informatique, formation... J'interviens à l'université de savoie pour enseigner la programmation pendant 4 années en parallèle de mon activité. Je met toujours un point d'honneur à être pédagogue et à ce que le client comprenne les enjeux et les fonctionnements de son projet.",
    image: "/featured-projects/corto.jpg",
    url: "https://www.cortodev.fr/",
  },
  {
    name: "Melissa",
    status: "Graphiste, UX/UI designer & rédactrice SEO",
    description:
      "Créative dans l’âme et rigoureuse dans l’exécution, je vous aide à construire une présence digitale alignée avec vos valeurs, vos objectifs et les attentes de vos utilisateurs. Mon approche repose sur la complémentarité entre esthétique, fluidité de navigation et contenus pensés pour répondre aux intentions de recherche. Chaque détail compte pour transformer vos visiteurs en clients. Ma mission, transformer votre vision en une identité de marque cohérente et engageante (logos, direction artistique, stratégie) à travers des interfaces fonctionnelles, des sites web performants, mais également de nombreux supports complémentaires (réseaux sociaux, magazines d’entreprise, brochures, catalogues…) Ce qui me motive : faire dialoguer design et technique pour développer des projets durables et inspirants à vos côtés.",
    image: "/featured-projects/melissa.jpg",
    url: "#",
  },
  {
    name: "Jonathan",
    status: "Développeur Fullstack",
    description:
      "Après 15 années dans la restauration, j’ai choisi de me réinventer en devenant développeur web. Curieux et déterminé, j’ai entamé ma reconversion via Udemy en me formant d’abord au back-end avec Python et Django. Passionné par l’univers du développement, j’ai élargi mes compétences au front-end (HTML, CSS, React, Next.js, TypeScript, Tailwind CSS) afin de concevoir des interfaces modernes, fluides et responsives. Ce qui me motive : créer des expériences web de qualité qui allient performance et esthétique, avec une attention particulière portée à l’utilisateur.",
    image: "/featured-projects/gonzo.jpg",
    url: "https://www.linkedin.com/in/jonathan-gonzales-0908b3127/",
  },
];

export default featuredProjectsContent;
