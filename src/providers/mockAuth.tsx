import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type UserRole = "client" | "companion" | "admin";

export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  location: string;
  walletBalance: number;
  monthlyEarnings: number;
  monthlySpending: number;
  unreadMessages: number;
  profileViews: number;
}

interface MockAuthContextType {
  user: MockUser | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const MockAuthContext = createContext<MockAuthContextType | null>(null);

const MOCK_USERS: Record<UserRole, MockUser> = {
  client: {
    id: "user-001",
    email: "demo@elitehub.com",
    name: "Alexander Sterling",
    role: "client",
    avatar: "/assets/companion-avatar-1.jpg",
    location: "New York",
    walletBalance: 2450.0,
    monthlyEarnings: 0,
    monthlySpending: 890.0,
    unreadMessages: 3,
    profileViews: 0,
  },
  companion: {
    id: "comp-001",
    email: "sophia@elitehub.com",
    name: "Sophia Chen",
    role: "companion",
    avatar: "/assets/companion-avatar-1.jpg",
    location: "New York",
    walletBalance: 3850.0,
    monthlyEarnings: 4200.0,
    monthlySpending: 0,
    unreadMessages: 5,
    profileViews: 128,
  },
  admin: {
    id: "admin-001",
    email: "ceo@elitehub.com",
    name: "CEO EliteHub",
    role: "admin",
    avatar: "/assets/companion-avatar-2.jpg",
    location: "London",
    walletBalance: 10000.0,
    monthlyEarnings: 0,
    monthlySpending: 0,
    unreadMessages: 12,
    profileViews: 0,
  },
};

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(() => {
    const saved = localStorage.getItem("elitehub_mock_user");
    return saved ? (JSON.parse(saved) as MockUser) : null;
  });

  const login = useCallback((role: UserRole) => {
    const mockUser = MOCK_USERS[role];
    localStorage.setItem("elitehub_mock_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("elitehub_mock_user");
    setUser(null);
  }, []);

  return (
    <MockAuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const ctx = useContext(MockAuthContext);
  if (!ctx) throw new Error("useMockAuth must be used within MockAuthProvider");
  return ctx;
}
