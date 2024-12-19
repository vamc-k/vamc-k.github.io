import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { SKILLS } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
        <Card>
          <CardContent className="p-6">
            <motion.div 
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {SKILLS.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={item}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer group"
                >
                  <skill.icon className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  <span className="text-sm font-medium text-center text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
