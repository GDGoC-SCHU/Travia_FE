import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const routerState = useRouterState();

  // 클라이언트에서만 렌더링할 수 있게 보호
  const [isClient, setIsClient] = useState(false);
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    setIsClient(true); // 마운트되면 클라이언트임을 알림
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("tokenExpiresAt");

    if (token && expiresAt) {
      const now = new Date().getTime();
      if (now < parseInt(expiresAt)) {
        setTokenExists(true);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiresAt");
        setTokenExists(false);
      }
    } else {
      setTokenExists(false);
    }
  };

  useEffect(() => {
    if (!isClient) return;

    checkToken();

    window.addEventListener("focus", checkToken);
    window.addEventListener("storage", checkToken);
    const interval = setInterval(checkToken, 30 * 1000);

    return () => {
      window.removeEventListener("focus", checkToken);
      window.removeEventListener("storage", checkToken);
      clearInterval(interval);
    };
  }, [isClient]);

  useEffect(() => {
    if (isClient) checkToken();
  }, [routerState.location.pathname, routerState.location.search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiresAt");
    setTokenExists(false);
    navigate({ to: "/" });
  };

  if (!isClient) return null; // 서버에서는 아무것도 렌더링하지 않음

  return (
    <NavigationMenu className="flex justify-between max-w-full p-4 bg-slate-50 shadow-md">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link
            to="/"
            className="rounded-xl p-2 hover:bg-slate-100 text-xl text-cyan-600"
          >
            🌏 Travia
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem className="flex gap-2">
          <Link
            to="/history"
            className="rounded-xl p-2 hover:bg-slate-100 text-xl text-cyan-600"
          >
            History
          </Link>
          {!tokenExists ? (
            <Link
              to="/login"
              className="rounded-xl p-2 hover:bg-slate-100 text-xl text-cyan-600"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-xl p-2 bg-red-100 hover:bg-red-200 text-red-600"
            >
              Logout
            </button>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
