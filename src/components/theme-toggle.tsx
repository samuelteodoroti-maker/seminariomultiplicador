import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const options = [
    { value: "light", icon: Sun, label: "Claro" },
    { value: "dark", icon: Moon, label: "Escuro" },
  ] as const;

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-card/60 p-1 backdrop-blur">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          aria-label={`Tema ${label}`}
          onClick={() => setTheme(value)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
            theme === value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
