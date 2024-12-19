import { motion, useSpring, useMotionValue, useTransform, animate } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Star, Code } from "lucide-react";
import { useEffect } from "react";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration });
    return controls.stop;
  }, [count, to, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {rounded}
    </motion.span>
  );
}

const achievements = [
  {
    title: "Years Experience",
    value: 5,
    icon: Code,
    description: "Years of professional software development",
  },
  {
    title: "Projects Completed",
    value: 50,
    icon: Star,
    description: "Successful project deliveries",
  },
  {
    title: "Team Members Led",
    value: 15,
    icon: Users,
    description: "Developers mentored and guided",
  },
  {
    title: "Certifications",
    value: 8,
    icon: Award,
    description: "Professional certifications achieved",
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Professional Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <achievement.icon className="h-6 w-6 text-primary" />
                    {achievement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">
                    <Counter from={0} to={achievement.value} />+
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
