import { useEffect } from "react";
import { LayoutActions } from "./LayoutActions";
import { ViewToggle } from "./ViewToggle";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function LayoutPage() {
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    if (loc.pathname === "/") nav("sets", { replace: true });
  }, [loc.pathname, nav]);

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <ViewToggle />
        <LayoutActions />
      </div>
      <Outlet />
    </main>
  );
}
