import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Briefcase, Award } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: typeof Code | typeof Briefcase | typeof Award;
  type: "work" | "achievement" | "project";
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "2024",
    title: "PyCon India 2024",
    description: "Contributing to the organization of PyCon India 2024 as a core team member",
    icon: Code,
    type: "project"
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

export function Timeline() {
  return (
    <section id="timeline" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Professional Journey</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />
          
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`mb-8 flex flex-col md:flex-row justify-center items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className="w-full px-4 md:px-0 md:w-5/12">
                <Card
                  className={`relative hover:shadow-lg transition-shadow ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <event.icon className="h-5 w-5 text-primary" />
                      {event.title}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Center dot */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary"
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
