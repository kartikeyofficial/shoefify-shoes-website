import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getUser, logoutUser } from "./auth.functions";

interface AuthUser {
  id: string;
  email: string;
  role: string;
}

interface AuthCtx {
  user: AuthUser | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
  refresh: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const data = await getUser();
      if (data) {
        setUser(data);
        setIsAdmin(data.role === "admin");
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    } catch (e) {
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const signOut = async () => {
    await logoutUser();
    setUser(null);
    setIsAdmin(false);
    window.location.href = "/login"; // Redirect to login on sign out
  };

  return (
    <Ctx.Provider value={{ user, isAdmin, loading, signOut, refresh }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
