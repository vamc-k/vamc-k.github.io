import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EXPERIENCE } from "@/lib/constants";

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Work Experience</h2>
        <div className="space-y-6">
          {EXPERIENCE.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <div className="text-muted-foreground">
                    {job.company} • {job.location} • {job.period}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
