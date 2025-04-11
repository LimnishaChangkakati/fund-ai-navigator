
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full w-10 h-10 transition-all duration-300 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-fund-purple-dark to-slate-900 border-fund-purple hover:border-fund-purple-light" 
          : "bg-gradient-to-br from-white to-blue-50 border-fund-blue hover:border-fund-blue-dark"
      }`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-yellow-200" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-fund-purple" />
      )}
      <span className="sr-only">{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</span>
    </Button>
  );
}
