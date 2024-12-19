import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Mail, Linkedin, Github } from "lucide-react";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Implementation for form submission would go here
      console.log(data);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
        <div className="max-w-2xl mx-auto px-4 md:px-0">
          <Card className="overflow-hidden">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle>Contact Me</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name">Name</label>
                  <Input id="name" {...register("name", { required: true })} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message">Message</label>
                  <Textarea
                    id="message"
                    {...register("message", { required: true })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>

              <div className="mt-8 flex justify-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button variant="outline" size="icon" asChild className="bg-gradient-to-tr from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0">
                    <a href="mailto:contact@example.com">
                      <Mail className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button variant="outline" size="icon" asChild className="bg-gradient-to-tr from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0">
                    <a
                      href="https://linkedin.com/in/vamsikrishnakolli"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button variant="outline" size="icon" asChild className="bg-gradient-to-tr from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white border-0">
                    <a
                      href="https://github.com/vamc-k"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
