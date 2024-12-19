import dynamic from 'next/dynamic'

// Dynamically import components with loading states
const Hero = dynamic(() => import('@/components/sections/Hero'), {
  loading: () => <div className="min-h-screen animate-pulse bg-muted" />
})
const About = dynamic(() => import('@/components/sections/About'))
const Skills = dynamic(() => import('@/components/sections/Skills'))
const Experience = dynamic(() => import('@/components/sections/Experience'))
const Projects = dynamic(() => import('@/components/sections/Projects'))
const Blog = dynamic(() => import('@/components/sections/Blog'))
const Contact = dynamic(() => import('@/components/sections/Contact'))
const GitHubActivity = dynamic(() => import('@/components/sections/GitHubActivity'))
const Achievements = dynamic(() => import('@/components/sections/Achievements'))
const Timeline = dynamic(() => import('@/components/sections/Timeline'))

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <About />
      <Skills />
      <Achievements />
      <Experience />
      <Timeline />
      <Projects />
      <Blog />
      <GitHubActivity />
      <Contact />
    </main>
  )
}
