import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useMobile } from "@/hooks/use-mobile";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isMobile = useMobile();

  const menuItems = ["About", "Skills", "Experience", "Projects", "Contact"];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <span className="text-xl font-bold">Vamsi Krishna Kolli</span>
        
        <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {isMobile ? (
              <>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
                
                {isOpen && (
                  <div className="absolute top-16 left-0 w-full bg-background border-b">
                    {menuItems.map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        className="w-full justify-start px-4"
                        onClick={() => scrollToSection(item)}
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-6">
                {menuItems.map((item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    onClick={() => scrollToSection(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            )}
          </div>
      </div>
    </nav>
  );
}