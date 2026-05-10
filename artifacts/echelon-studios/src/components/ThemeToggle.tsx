import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed bottom-6 right-6 z-[60] md:bottom-8 md:right-8">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="group relative flex h-14 w-[88px] items-center rounded-full border border-border bg-background/85 p-1 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_32px_-4px_rgba(245,197,24,0.35)]"
      >
        <span className="sr-only">Toggle theme</span>
        <span className="pointer-events-none absolute inset-y-1 left-1 flex w-12 items-center justify-center">
          <Moon className={`absolute h-5 w-5 text-foreground/70 transition-all duration-500 ${isDark ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
        </span>
        <span className="pointer-events-none absolute inset-y-1 right-1 flex w-12 items-center justify-center">
          <Sun className={`absolute h-5 w-5 text-foreground/70 transition-all duration-500 ${isDark ? "scale-50 opacity-0" : "scale-100 opacity-100"}`} />
        </span>
        <span className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_4px_16px_-2px_rgba(245,197,24,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isDark ? "translate-x-0" : "translate-x-[36px]"}`}>
          {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </span>
      </button>
    </div>
  );
}
