import { Link, useNavigate } from "react-router";
import { SignUp } from "@clerk/clerk-react";
import { User, Briefcase, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setMockUser } from "@/hooks/useAuth";
import type { UserRole } from "@/hooks/useAuth";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [demoLoading, setDemoLoading] = useState<UserRole | null>(null);

  const handleDemoLogin = (role: UserRole) => {
    setDemoLoading(role);
    setMockUser(role);
    setTimeout(() => {
      navigate("/dashboard");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E11D48]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-gradient-crimson" style={{ fontFamily: "'Playfair Display', serif" }}>
              EliteHub
            </span>
            <div className="w-2 h-2 rounded-full bg-[#E11D48]" />
          </Link>
          <h1 className="text-3xl font-bold text-[#F5E6D3] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create Your Account
          </h1>
          <p className="text-sm text-[#9CA3AF]">
            Join the premium companion platform
          </p>
        </div>

        <div className="glass glass-border rounded-xl p-8">
          {/* Clerk Sign Up */}
          <div className="mb-6">
            <SignUp
              signInUrl="/login"
              fallbackRedirectUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "bg-transparent shadow-none border-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "w-full bg-[#1E1E2D] border border-white/10 text-[#F5E6D3] hover:bg-[#2a2a3d] rounded-full py-5",
                  formButtonPrimary: "w-full gradient-crimson text-white border-0 hover:opacity-90 rounded-full py-6 text-base font-semibold",
                  formFieldInput: "bg-[#1E1E2D] border-white/10 text-[#F5E6D3] placeholder:text-[#9CA3AF]/50 focus:border-[#E11D48]/50 focus:ring-[#E11D48]/20 h-12 rounded-lg",
                  formFieldLabel: "text-[#9CA3AF] text-sm",
                  footerActionLink: "text-[#E11D48] hover:text-[#FB7185]",
                  identityPreviewText: "text-[#F5E6D3]",
                  identityPreviewEditButton: "text-[#E11D48]",
                  formResendCodeLink: "text-[#E11D48]",
                  otpCodeFieldInput: "bg-[#1E1E2D] border-white/10 text-[#F5E6D3]",
                  dividerLine: "bg-white/10",
                  dividerText: "text-[#9CA3AF]",
                  alternativeMethodsBlockButton: "text-[#F5E6D3] border-white/10",
                  formFieldErrorText: "text-[#E11D48]",
                  alertText: "text-[#F5E6D3]",
                },
                variables: {
                  colorBackground: "transparent",
                  colorText: "#F5E6D3",
                  colorPrimary: "#E11D48",
                  colorInputBackground: "#1E1E2D",
                  colorInputText: "#F5E6D3",
                  colorTextSecondary: "#9CA3AF",
                },
              }}
            />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-[#9CA3AF] uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Demo Login Buttons */}
          <div className="space-y-3">
            <p className="text-xs text-[#9CA3AF] text-center uppercase tracking-wider">Quick Start — No Account Needed</p>
            <Button
              variant="outline"
              className="w-full border-white/10 text-[#F5E6D3] hover:bg-white/5 rounded-full py-5"
              onClick={() => handleDemoLogin("client")}
              disabled={!!demoLoading}
            >
              <User className="w-4 h-4 mr-2" />
              {demoLoading === "client" ? "Signing in..." : "Try as Client Demo"}
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#E11D48]/30 text-[#F5E6D3] hover:bg-[#E11D48]/10 rounded-full py-5"
              onClick={() => handleDemoLogin("companion")}
              disabled={!!demoLoading}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              {demoLoading === "companion" ? "Signing in..." : "Try as Companion Demo"}
            </Button>
            <Button
              variant="outline"
              className="w-full border-amber-500/30 text-[#F5E6D3] hover:bg-amber-500/10 rounded-full py-5"
              onClick={() => handleDemoLogin("admin")}
              disabled={!!demoLoading}
            >
              <Crown className="w-4 h-4 mr-2" />
              {demoLoading === "admin" ? "Signing in..." : "Try as Admin Demo"}
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-[#9CA3AF] mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#E11D48] hover:text-[#FB7185] transition-colors font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
