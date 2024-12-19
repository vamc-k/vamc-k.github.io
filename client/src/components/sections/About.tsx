import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        <Card>
          <CardHeader>
            <CardTitle>Background</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              I'm a Senior Platform Engineer at Wyvaa Software Labs in Bangalore, where I
              specialize in building scalable applications using modern technologies. With
              extensive experience in full-stack development, I work with React.js,
              Node.js, Python, and AWS to create robust solutions.
            </p>
            <p>
              My expertise spans across web development, cloud infrastructure, and mobile
              app development using Flutter. I'm passionate about clean code,
              performance optimization, and creating exceptional user experiences.
            </p>
            <p>
              Currently, I'm actively involved in the Python community, contributing to
              the organization of PyCon India 2024. I believe in continuous learning
              and sharing knowledge with the developer community.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
