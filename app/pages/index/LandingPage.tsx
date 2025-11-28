import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "~/components/ui/button";

export function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4">
        <div className="space-y-3 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl bg-linear-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            FlashDeck
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Master your knowledge, one card at a time.
          </p>
        </div>

        <Button
          size="lg"
          onClick={() => loginWithRedirect()}
          className="px-10 py-6 text-base font-medium rounded-xl shadow-lg transition-all hover:scale-105 hover:shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150"
        >
          Get started
        </Button>
      </div>
    </div>
  );
}
