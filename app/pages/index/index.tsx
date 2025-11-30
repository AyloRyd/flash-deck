import { useAuth0 } from "@auth0/auth0-react";
import { Loader2 } from "lucide-react";
import { useSyncUser } from "~/hooks/use-sync-user";
import { LandingPage } from "./LandingPage";
import { SignOutButton } from "./SignOutButton";
import { Outlet } from "react-router";
import { Header } from "./Header";

export default function IndexPage() {
  const {
    user,
    isAuthenticated,
    isLoading: isAuthLoading,
    error: authError,
  } = useAuth0();

  const { isLoading: isSyncing, error: syncError } = useSyncUser();

  const isLoading = isAuthLoading || (isAuthenticated && isSyncing);
  const error = authError || syncError;

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-destructive">
        <p>Error: {error.message}</p>
        <SignOutButton />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header user={user} />
        <Outlet />
      </div>
    );
  }

  return <LandingPage />;
}
