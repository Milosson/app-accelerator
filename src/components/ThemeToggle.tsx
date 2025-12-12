import { Moon, Sun, Monitor, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme, getSmartThemeSuggestion } from "@/hooks/useTheme";
import { toast } from "sonner";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const handleSmartTheme = () => {
    const suggested = getSmartThemeSuggestion();
    setTheme(suggested);
    toast.success(`Tema anpassat för ${suggested === 'dark' ? 'kvällsläsning' : 'dagsljus'}`, {
      description: 'Baserat på tid och enhetsläge',
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          {resolvedTheme === 'dark' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span className="sr-only">Byt tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          Ljust
          {theme === 'light' && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          Mörkt
          {theme === 'dark' && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="mr-2 h-4 w-4" />
          System
          {theme === 'system' && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSmartTheme}>
          <Sparkles className="mr-2 h-4 w-4 text-accent" />
          Smart (AI)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
