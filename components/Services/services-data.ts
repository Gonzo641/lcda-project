import { Laptop, Brain, Paintbrush, Database, Code, ArrowLeftRight } from "lucide-react";

export interface ServiceData {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  url: string;
}

export const servicesData: ServiceData[] = [
  {
    id: 1,
    title: "Site Web & Applications",
    description:
      "Création de sites Web et applications Web modernes et attrayants, afin de les rendre performantes et évolutives, grâce à l’utilisation des dernières technologies.",
    icon: Laptop,
    url: "#",
  },
  {
    id: 2,
    title: "Conseil & Accompagnement",
    description:
      "L’accompagnement est primordial pour nous ! Nous vous accompagnons tout au long de votre projet, de la conception à la mise en production.",
    icon: Brain,
    url: "#",
  },
  {
    id: 3,
    title: "Designs & Interfaces",
    description:
      "Réalisation des maquettes de vos projets. Interfaces modernes et ergonomiques avec les dernières technologies.",
    icon: Paintbrush,
    url: "#",
  },
  {
    id: 4,
    title: "API Rest",
    description:
      "Création d’API REST robustes et sécurisées pour vos applications.",
    icon: Database,
    url: "#",
  },
  {
    id: 5,
    title: "IA & Solution Logiciel",
    description:
      "Ensemble, nous réfléchissons à la solution logicielle la plus adaptée à votre projet. Nous vous conseillons sur les technologies à utiliser et les bonnes pratiques à adopter.",
    icon: Code,
    url: "#",
  },
  {
    id: 6,
    title: "Migration d’application",
    description:
      "Vous souhaitez migrer votre application vers une nouvelle technologie ? Nous pouvons vous aider et vous conseiller sur les meilleures options.",
    icon: ArrowLeftRight,
    url: "#",
  },
];


export default servicesData;





