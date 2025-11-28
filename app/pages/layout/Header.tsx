import { User } from "@auth0/auth0-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { SignOutButton } from "../index/SignOutButton";
import { Link } from "react-router";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  return (
    <Link to="/">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-slate-200">
              <AvatarImage
                src={user.picture}
                alt={user.name}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </header>
    </Link>
  );
}
