import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Instagram, Youtube, Linkedin, Mail, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "lucide-react";

export function Links() {
  const links = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/vamc-me",
      color: "bg-gradient-to-r from-fuchsia-500 via-rose-500 to-orange-500 text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/vamsikrishnakolli",
      color: "bg-gradient-to-r from-blue-600 to-blue-500 text-white",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@vamclips5276",
      color: "bg-gradient-to-r from-red-600 to-red-500 text-white",
    },
    {
      name: "WhatsApp",
      icon: SiWhatsapp,
      url: "https://wa.me/+918985221133",
      color: "bg-gradient-to-r from-green-600 to-green-500 text-white",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:hello@vamc.in",
      color: "bg-gradient-to-r from-gray-700 to-gray-600 text-white",
    },
    {
      name: "Topmate",
      icon: Link,
      url: "https://topmate.io/kolli",
      color: "bg-gradient-to-r from-purple-600 to-purple-500 text-white",
    },
    {
      name: "Call",
      icon: Phone,
      url: "tel:+918985221133",
      color: "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-16 px-4">
      <div className="max-w-md mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
            <img
              src="https://avatars.githubusercontent.com/u/11007620"
              alt="Vamsi Krishna Kolli"
              className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover border-4 border-background"
            />
          </div>
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Vamsi Krishna Kolli
          </h1>
          <p className="text-lg text-muted-foreground">
            Senior Platform Engineer | Full Stack Developer
          </p>
        </motion.div>

        <motion.div className="space-y-4">
          {links.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                className={`w-full h-14 ${link.color} shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl`}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 text-lg font-medium"
                >
                  <link.icon className="h-6 w-6" />
                  {link.name}
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
