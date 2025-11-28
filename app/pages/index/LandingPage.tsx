import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "~/components/ui/button";

export function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-slate-50 dark:bg-slate-950">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          FlashDeck
        </h1>
        <p className="text-muted-foreground">
          Master your knowledge, one card at a time.
        </p>
      </div>
      <Button
        size="lg"
        onClick={() => loginWithRedirect()}
        className="px-8 shadow-md transition-all hover:scale-105"
      >
        Get Started
      </Button>
    </div>
  );
}
