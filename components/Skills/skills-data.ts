export interface SkillsData {
  id: number;
  name: string;
  image: string;
  url: string;
}

const skillsData: SkillsData[] = [
    {
    id: 1,
    name: "Next.js",
    image: "/skills/nextjs.png",
    url: "https://nextjs.org/",
    },
    {
    id: 2,
    name: "Python",
    image: "/skills/python.png",
    url: "https://www.python.org/",
    },
    {
    id: 3,
    name: "Django",
    image: "/skills/django.png",
    url: "https://www.djangoproject.com/",
    },
    {
    id: 4,
    name: "Django Rest",
    image: "/skills/django-rest.png",
    url: "https://www.django-rest-framework.org/",
    },
    {
    id: 5,
    name: "PHP",
    image: "/skills/php.png",
    url: "https://www.php.net/",
    },
    {
    id: 6,
    name: "WordPress",
    image: "/skills/wordpress.png",
    url: "https://wordpress.com/fr/",
    },
    {
    id: 7,
    name: "React",
    image: "/skills/react.png",
    url: "https://fr.react.dev/",
    },
    {
    id: 8,
    name: "Postgresql",
    image: "/skills/postgresql.png",
    url: "https://www.postgresql.org/",
    },
    {
    id: 9,
    name: "Docker",
    image: "/skills/docker.png",
    url: "https://www.docker.com/",
    },
    {
    id: 10,
    name: "Caprover",
    image: "/skills/caprover.png",
    url: "https://caprover.com/",
    },
    {
    id: 11,
    name: "Qdrant",
    image: "/skills/qdrant.png",
    url: "https://qdrant.tech/",
    },
    {
    id: 12,
    name: "Mistral AI",
    image: "/skills/mistral.png",
    url: "https://mistral.ai/",
    },
];

export default skillsData;
