import { useAuth0 } from "@auth0/auth0-react";
import { Loader2 } from "lucide-react";
import { useSyncUser } from "~/hooks/use-sync-user";
import { LandingPage } from "./LandingPage";
import { LogoutButton } from "./LogoutButton";
import { DashboardPage } from "../dashboard";

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

  let content = null;

  if (error) {
    content = (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-destructive">
        <p>Error: {error.message}</p>
        <LogoutButton />
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  } else if (isAuthenticated && user) {
    content = <DashboardPage user={user} />;
  } else {
    content = <LandingPage />;
  }

  return content;
}
