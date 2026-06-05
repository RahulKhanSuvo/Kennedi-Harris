import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[240px] h-[64px] z-30 bg-kh-dark-2 border-b border-white/5 px-6 flex items-center justify-between">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl uppercase tracking-tight text-white hidden sm:block">
          Admin
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 ml-auto">
        {user && (
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-zinc-300">{user.name}</p>
            <p className="text-[10px] text-zinc-500">{user.email}</p>
          </div>
        )}

        <Button
          variant="destructive"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2 font-condensed font-bold uppercase tracking-wider text-xs px-3 py-1.5 rounded-lg border border-red-500/10 cursor-pointer"
        >
          <LogOut size={14} />
          Logout
        </Button>
      </div>
    </header>
  );
}
