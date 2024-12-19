import type { IconType } from "react-icons";
import {
  SiOpenjdk,
  SiSpring,
  SiPython,
  SiDjango,
  SiNextdotjs,
  SiReact,
  SiFlutter,
  SiNeo4J,
  SiAmazon,
  SiKubernetes,
  SiDocker,
  SiJenkins,
  SiMongodb,
  SiPostgresql,
  SiRabbitmq,
  SiRedis,
  SiFigma,
  SiGooglecloud,
  SiFastapi,
  SiContentful,
} from "react-icons/si";

interface Skill {
  name: string;
  icon: IconType;
}

export const SKILLS: Skill[] = [
  { name: "Java", icon: SiOpenjdk },
  { name: "Spring Boot", icon: SiSpring },
  { name: "Python", icon: SiPython },
  { name: "Django", icon: SiDjango },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React.js", icon: SiReact },
  { name: "React Native", icon: SiReact },
  { name: "Flutter", icon: SiFlutter },
  { name: "Neo4j", icon: SiNeo4J },
  { name: "AWS", icon: SiAmazon },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Docker", icon: SiDocker },
  { name: "Jenkins", icon: SiJenkins },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "RabbitMQ", icon: SiRabbitmq },
  { name: "Redis", icon: SiRedis },
  { name: "Figma", icon: SiFigma },
  { name: "AWS Services", icon: SiAmazon },
  { name: "Google Cloud", icon: SiGooglecloud },
  { name: "CMS", icon: SiContentful },
];

export const EXPERIENCE = [
  {
    title: "Senior Platform Engineer",
    company: "Wyvaa Software Labs Pvt Ltd",
    location: "Bangalore",
    period: "Present",
    responsibilities: [
      "Full Stack Development with React.js, Node.js, and Python",
      "Cloud Infrastructure Management on AWS",
      "Mobile App Development with Flutter",
      "System Architecture Design",
    ],
  },
];

export const PROJECTS = [
  // {
  //   title: "PyCon India 2024",
  //   description: "Official Repository for PyCon India 2024 Conference",
  //   link: "https://github.com/pythonindia/inpycon2024",
  //   tech: ["JavaScript", "Python"],
  // },
];
