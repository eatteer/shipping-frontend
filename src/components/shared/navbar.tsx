import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/use-auth";

export function Navbar() {
  const auth = useAuth();

  return (
    <nav className="flex p-4 border-b w-full">
      <Button
        onClick={() => auth.logout()}
        className="ml-auto"
        variant="outline"
      >
        Logout
      </Button>
    </nav>
  );
}
