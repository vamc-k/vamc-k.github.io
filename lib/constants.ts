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
  SiWhatsapp,
  SiLinkedin,
  SiGithub,
} from "react-icons/si";
import { Mail, Phone, Code, Briefcase, Award, Link } from "lucide-react";

// Profile Information
export const PROFILE = {
  name: "Vamsi Krishna Kolli",
  title: "Senior Platform Engineer | Full Stack Developer",
  avatar: "https://avatars.githubusercontent.com/u/vamc-k",
  description: "Passionate about building scalable applications and crafting elegant solutions using modern technologies. Experienced in full-stack development, cloud architecture, and mobile app development.",
  email: "contact@example.com",
  phone: "+1234567890",
  location: "Bangalore, India",
};

// Navigation Items
export const NAV_ITEMS = [
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" }
];

// Social Links
export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: "https://instagram.com/vamc-k",
    color: "bg-gradient-to-r from-fuchsia-500 via-rose-500 to-orange-500",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@vamc-k",
    color: "bg-gradient-to-r from-red-600 to-red-500",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/vamsikrishnakolli",
    color: "bg-gradient-to-r from-blue-600 to-blue-500",
  },
  {
    name: "WhatsApp",
    icon: SiWhatsapp,
    url: "https://wa.me/yourphonenumber",
    color: "bg-gradient-to-r from-green-600 to-green-500",
  },
  {
    name: "Email",
    icon: Mail,
    url: `mailto:${PROFILE.email}`,
    color: "bg-gradient-to-r from-gray-700 to-gray-600",
  },
  {
    name: "Topmate",
    icon: Link,
    url: "https://topmate.io/vamc-k",
    color: "bg-gradient-to-r from-purple-600 to-purple-500",
  },
  {
    name: "Call",
    icon: Phone,
    url: `tel:${PROFILE.phone}`,
    color: "bg-gradient-to-r from-cyan-600 to-cyan-500",
  },
];

// Skills
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
  { name: "Google Cloud", icon: SiGooglecloud },
  { name: "CMS", icon: SiContentful },
];

// Experience
export const EXPERIENCE = [
  {
    title: "Senior Platform Engineer",
    company: "Wyvaa Software Labs Pvt Ltd",
    location: PROFILE.location,
    period: "2023 - Present",
    responsibilities: [
      "Full Stack Development with Java, Python, React.js and ReactNative",
      "Cloud Infrastructure Management on AWS",
      "Mobile App Development with Flutter",
      "System Architecture Design",
    ],
  },
];

// Projects
export const PROJECTS = [
  // {
  //   title: "PyCon India 2024",
  //   description: "Official Repository for PyCon India 2024 Conference",
  //   link: "https://github.com/pythonindia/inpycon2024",
  //   tech: ["JavaScript", "Python", "Next.js", "Django"],
  // },
];

// Achievements
export const ACHIEVEMENTS = [
  {
    title: "Years Experience",
    value: 8,
    icon: Code,
    description: "Years of professional software development",
  },
  {
    title: "Projects Completed",
    value: 50,
    icon: Award,
    description: "Successful project deliveries",
  },
  {
    title: "Team Members Led",
    value: 15,
    icon: Briefcase,
    description: "Developers mentored and guided",
  },
  {
    title: "Certifications",
    value: 8,
    icon: Award,
    description: "Professional certifications achieved",
  },
];

// Timeline Events
export const TIMELINE_EVENTS = [
  {
    date: "2024",
    title: "Co-Founder at Onemyle",
    description: "Building onemyle...",
    icon: Code,
    type: "work"
  },
  {
    date: "2023",
    title: "Senior Platform Engineer",
    description: "Joined Wyvaa Software Labs as Senior Platform Engineer",
    icon: Briefcase,
    type: "work"
  },
  {
    date: "2022",
    title: "AWS Certification",
    description: "Achieved AWS Solutions Architect certification",
    icon: Award,
    type: "achievement"
  }
];

// Blog Posts
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
  content?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-scalable-applications-with-kubernetes",
    title: "Building Scalable Applications with Kubernetes",
    excerpt: "Learn how to deploy and manage containerized applications at scale using Kubernetes orchestration.",
    date: "2024-12-15",
    author: PROFILE.name,
    readTime: "8 min read",
    tags: ["Kubernetes", "DevOps", "Cloud Native"],
    coverImage: "/blog/kubernetes-cover.svg",
    content: `
# Building Scalable Applications with Kubernetes

Kubernetes has become the de facto standard for container orchestration in modern cloud-native applications. In this article, we'll explore how to effectively use Kubernetes to build and manage scalable applications.

## Introduction to Kubernetes

Kubernetes, often abbreviated as K8s, is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It was originally developed by Google and is now maintained by the Cloud Native Computing Foundation (CNCF).

## Key Concepts

1. **Pods**: The smallest deployable units in Kubernetes
2. **Services**: Abstract way to expose applications running on pods
3. **Deployments**: Declarative way to manage pod lifecycles
4. **ConfigMaps and Secrets**: Managing application configuration

## Best Practices for Scalability

### 1. Resource Management
- Set appropriate resource requests and limits
- Implement horizontal pod autoscaling
- Use node autoscaling for dynamic workloads

### 2. High Availability
- Deploy across multiple availability zones
- Implement proper liveness and readiness probes
- Use pod disruption budgets

### 3. Monitoring and Observability
- Implement comprehensive metrics collection
- Set up proper logging infrastructure
- Use distributed tracing

## Conclusion

Kubernetes provides powerful tools for building scalable applications, but it requires careful planning and implementation of best practices to achieve optimal results.
    `
  },
  {
    slug: "modern-frontend-architecture",
    title: "Modern Frontend Architecture with Next.js",
    excerpt: "Exploring best practices and patterns for building robust frontend applications with Next.js 14.",
    date: "2024-12-10",
    author: PROFILE.name,
    readTime: "6 min read",
    tags: ["Next.js", "React", "Frontend"],
    coverImage: "/blog/nextjs-cover.svg",
    content: `
# Modern Frontend Architecture with Next.js

Next.js has revolutionized how we build React applications by providing a powerful framework that combines the best of server-side rendering and static site generation. Let's explore modern architecture patterns using Next.js 14.

## The App Router

Next.js 14 introduces a new App Router built on React Server Components, offering:

- Improved performance
- Enhanced developer experience
- Better SEO capabilities
- Built-in data fetching

## Key Architecture Patterns

### 1. Server Components
- Default server-side rendering
- Reduced client-side JavaScript
- Improved initial page load

### 2. Data Fetching
- Server-side data fetching
- Incremental Static Regeneration
- Dynamic API routes

### 3. Styling Solutions
- CSS Modules
- Tailwind CSS integration
- CSS-in-JS solutions

## Best Practices

1. **Performance Optimization**
   - Use Image component
   - Implement proper caching
   - Optimize fonts and assets

2. **Code Organization**
   - Follow the feature-first approach
   - Implement proper error boundaries
   - Use proper TypeScript patterns

## Conclusion

Next.js 14 provides a solid foundation for building modern web applications with its powerful features and optimizations.
    `
  },
  {
    slug: "python-performance-optimization",
    title: "Python Performance Optimization Techniques",
    excerpt: "Deep dive into advanced techniques for optimizing Python applications for better performance.",
    date: "2024-12-05",
    author: PROFILE.name,
    readTime: "10 min read",
    tags: ["Python", "Performance", "Backend"],
    coverImage: "/blog/python-cover.svg",
    content: `
# Python Performance Optimization Techniques

Python is known for its simplicity and readability, but when it comes to performance, there are various techniques we can employ to make our applications faster and more efficient.

## Understanding Python's Performance

### The GIL (Global Interpreter Lock)
- What it is and why it exists
- Impact on multi-threading
- Workarounds and alternatives

### Memory Management
- How Python manages memory
- Common memory leaks
- Garbage collection optimization

## Optimization Techniques

### 1. Code-Level Optimizations
- Use appropriate data structures
- Implement generator functions
- Leverage built-in functions

### 2. Profiling and Monitoring
- cProfile and line_profiler
- Memory profiling
- Performance monitoring tools

### 3. Parallel Processing
- multiprocessing
- asyncio for I/O-bound operations
- Distributed computing

## Best Practices

1. **Algorithmic Efficiency**
   - Choose optimal algorithms
   - Use proper data structures
   - Implement caching when needed

2. **Resource Management**
   - Proper connection pooling
   - Efficient file handling
   - Memory usage optimization

## Conclusion

By implementing these optimization techniques, you can significantly improve the performance of your Python applications while maintaining code readability and maintainability.
    `
  }
];
