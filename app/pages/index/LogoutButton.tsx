import { useAuth0 } from "@auth0/auth0-react";
import { LogOut } from "lucide-react";
import { Button } from "~/components/ui/button";
import { clearAccessToken } from "~/lib/postgrest";

export function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Button
      variant="outline"
      className="w-fit gap-2 rounded-lg px-4 text-muted-foreground transition-colors hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
      onClick={() => {
        clearAccessToken();
        logout({ logoutParams: { returnTo: window.location.origin } });
      }}
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  );
}
