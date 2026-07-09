import { trpc } from "@/providers/trpc";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-react";
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
  const clerkAuth = useClerkAuth();
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const mockUser = getMockUserFromStorage();
  const isMock = !!mockUser;

  const utils = trpc.useUtils();

  const {
    data: user,
    isLoading: trpcLoading,
  } = trpc.auth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: clerkAuth.isSignedIn && !isMock,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
    },
  });

  const logout = useCallback(async () => {
    if (isMock) {
      clearMockUser();
      window.location.reload();
    } else {
      await clerkAuth.signOut();
      logoutMutation.mutate();
      window.location.href = "/";
    }
  }, [isMock, clerkAuth, logoutMutation]);

  // Build effective user from either Clerk + tRPC or mock
  let effectiveUser: AppUser | null = null;

  if (isMock && mockUser) {
    effectiveUser = mockUser;
  } else if (user) {
    effectiveUser = {
      id: String(user.id),
      email: user.email ?? "",
      name: user.name ?? "",
      role: user.role as UserRole,
      avatar: user.avatar ?? "",
      location: user.location ?? "",
    };
  } else if (clerkUser) {
    // Fallback to Clerk user data while tRPC loads
    effectiveUser = {
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
      name: clerkUser.fullName ?? clerkUser.username ?? "",
      role: "client",
      avatar: clerkUser.imageUrl ?? "",
      location: "",
    };
  }

  const isLoading = isMock ? false : (!clerkLoaded || trpcLoading);

  // Auto-redirect if not authenticated
  // Note: We handle this in components rather than here to avoid loops

  return useMemo(
    () => ({
      user: effectiveUser,
      isAuthenticated: !!effectiveUser || clerkAuth.isSignedIn || isMock,
      isLoading,
      logout,
      refresh: () => utils.auth.me.invalidate(),
      isMock,
      clerkUser,
    }),
    [effectiveUser, isLoading, logout, utils, isMock, clerkAuth.isSignedIn, clerkUser],
  );
}
