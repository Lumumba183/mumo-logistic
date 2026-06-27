import { trpc } from "@/providers/trpc";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { LOGIN_PATH } from "@/const";
import { mockUserClient, mockUserCompanion, mockUserAdmin } from "@/data/mockData";

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

function getMockUserFromStorage(): AppUser | null {
  try {
    const saved = localStorage.getItem("elitehub_mock_user");
    if (saved) return JSON.parse(saved) as AppUser;
  } catch { /* ignore */ }
  return null;
}

export function setMockUser(role: UserRole) {
  const user = role === "companion" ? mockUserCompanion : role === "admin" ? mockUserAdmin : mockUserClient;
  localStorage.setItem("elitehub_mock_user", JSON.stringify(user));
  return user;
}

export function clearMockUser() {
  localStorage.removeItem("elitehub_mock_user");
}

export function isMockMode(): boolean {
  return !!getMockUserFromStorage();
}

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = LOGIN_PATH } =
    options ?? {};

  const navigate = useNavigate();
  const mockUser = getMockUserFromStorage();
  const isMock = !!mockUser;

  const utils = trpc.useUtils();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = trpc.auth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !isMock,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      navigate(redirectPath);
    },
  });

  const logout = useCallback(() => {
    if (isMock) {
      clearMockUser();
      window.location.reload();
    } else {
      logoutMutation.mutate();
    }
  }, [isMock, logoutMutation]);

  const effectiveUser = isMock ? mockUser : (user ?? null);
  const effectiveLoading = isMock ? false : (isLoading || logoutMutation.isPending);

  useEffect(() => {
    if (redirectOnUnauthenticated && !effectiveLoading && !effectiveUser) {
      const currentPath = window.location.pathname;
      if (currentPath !== redirectPath) {
        navigate(redirectPath);
      }
    }
  }, [redirectOnUnauthenticated, effectiveLoading, effectiveUser, navigate, redirectPath]);

  return useMemo(
    () => ({
      user: effectiveUser,
      isAuthenticated: !!effectiveUser,
      isLoading: effectiveLoading,
      error: isMock ? null : error,
      logout,
      refresh: isMock ? () => Promise.resolve() : refetch,
      isMock,
    }),
    [effectiveUser, effectiveLoading, error, logout, refetch, isMock],
  );
}
