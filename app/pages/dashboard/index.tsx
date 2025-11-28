import { useState } from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import { clearAccessToken } from "~/lib/postgrest";
import { DashboardHeader } from "./DashboardHeader";
import { DatabaseActions } from "./DatabaseActions";
import { FoldersGrid } from "./FoldersGrid";
import { SetsGrid } from "./SetsGrid";
import { ViewToggle } from "./ViewToggle";

export type View = "folders" | "sets";

interface DashboardPageProps {
  user: User;
}

export function DashboardPage({ user }: DashboardPageProps) {
  const { logout } = useAuth0();
  const [view, setView] = useState<View>("sets");

  const handleSignOut = () => {
    clearAccessToken();
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} onSignOut={handleSignOut} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <ViewToggle view={view} onViewChange={setView} />
          <DatabaseActions />
        </div>

        {view === "folders" ? <FoldersGrid /> : <SetsGrid />}
      </main>
    </div>
  );
}
