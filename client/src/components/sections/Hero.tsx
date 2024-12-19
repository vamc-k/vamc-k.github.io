import { motion } from "framer-motion";
import { useGreeting } from "@/hooks/use-greeting";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-20 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--primary-rgb), 0) 70%)",
        }}
        initial={{ scale: 1.2 }}
        animate={{
          y: ["0%", "-10%"],
          scale: [1.2, 1.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        <div className="mb-8">
          <img
            src="https://avatars.githubusercontent.com/u/11007620"
            alt="Vamsi Krishna Kolli"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <motion.div className="mb-2 text-lg text-muted-foreground">{useGreeting()}</motion.div>
          <h1 className="text-4xl font-bold mb-4">Vamsi Krishna Kolli</h1>
          <h2 className="text-xl text-muted-foreground mb-6">
            Senior Platform Engineer | Full Stack Developer
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Passionate about building scalable applications and crafting elegant solutions
            using modern technologies. Experienced in full-stack development, cloud
            architecture, and mobile app development.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 md:px-0">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              size="lg"
              asChild
              className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <a href="https://github.com/vamc-k" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </div>
              </a>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <a href="https://linkedin.com/in/vamsikrishnakolli" target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="flex items-center"
                  whileHover={{ gap: '0.75rem' }}
                  initial={{ gap: '0.5rem' }}
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </motion.div>
              </a>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.div
                className="flex items-center"
                whileHover={{ gap: '0.75rem' }}
                initial={{ gap: '0.5rem' }}
              >
                <Mail className="h-5 w-5" />
                <span>Contact Me</span>
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}