import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { LOGIN_PATH } from "@/const";

export type UserRole = "client" | "companion" | "admin";

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  location: string;
}

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = LOGIN_PATH } =
    options ?? {};

  const navigate = useNavigate();

  const logout = useCallback(async () => {
    // No auth — nothing to log out
    window.location.href = "/";
  }, []);

  return useMemo(
    () => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      logout,
      refresh: () => {},
      isMock: false,
      clerkUser: null,
    }),
    [logout],
  );
}
