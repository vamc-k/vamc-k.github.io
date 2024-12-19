import { Switch, Route } from "wouter";
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { NavBar } from '@/components/NavBar';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
// import { GitHubActivity } from '@/components/sections/GitHubActivity';
import { Achievements } from '@/components/sections/Achievements';
import { Timeline } from '@/components/sections/Timeline';
import { Links } from '@/pages/Links';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

function Home() {
  return (
    <main className="items-center justify-center lg:pl-40 lg:pr-40 pl-2 pr-2 space-y-8">
      <Hero />
      <About />
      <Skills />
      <Achievements />
      <Experience />
      <Timeline />
      <Projects />
      <Contact />
    </main>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen />
      <ScrollProgress />
      <Switch>
        <Route path="/go" component={Links} />
        <Route path="/">
          <>
            <NavBar />
            <Home />
          </>
        </Route>
      </Switch>
    </div>
  );
}

export default App;