import { User } from "@auth0/auth0-react";
import { Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { SignOutButton } from "../index/SignOutButton";
import { useThemeStore } from "~/stores/theme-store";
import { Link } from "react-router";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/sets" className="flex items-center gap-3 min-w-0">
          <Avatar className="h-10 w-10 border-2 border-slate-200 shrink-0">
            <AvatarImage
              src={user.picture}
              alt={user.name}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback className="bg-primary/10 text-primary">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>

          <div className="grid gap-0.5 min-w-0 text-left">
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </Link>

        <div className="shrink-0 ml-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
