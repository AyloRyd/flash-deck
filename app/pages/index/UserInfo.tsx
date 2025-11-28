import { User } from "@auth0/auth0-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { LogoutButton } from "./LogoutButton";

interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <Card className="w-full max-w-sm rounded-3xl shadow-lg">
        <CardHeader className="flex flex-col items-center gap-4 pb-2">
          <Avatar className="h-24 w-24 border-4 border-white shadow-sm ring-1 ring-slate-200">
            <AvatarImage
              src={user.picture}
              alt={user.name}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {user.name}
            </CardTitle>
            <CardDescription className="text-base font-medium text-muted-foreground">
              {user.email}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="grid gap-4 pt-4">
          <div className="text-center text-xs tracking-widest uppercase text-muted-foreground">
            Account Synced & Active
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <LogoutButton />
        </CardFooter>
      </Card>
    </div>
  );
}
