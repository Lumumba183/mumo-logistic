import { Link } from "react-router";
import { User, Briefcase, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [demoLoading, setDemoLoading] = useState<string | null>(null);

  const handleDemoLogin = (role: string) => {
    setDemoLoading(role);
    // Public site — just navigate to dashboard
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
            This is a public demo site — no registration required
          </p>
        </div>

        <div className="glass glass-border rounded-xl p-8">
          <div className="space-y-3">
            <p className="text-xs text-[#9CA3AF] text-center uppercase tracking-wider">Choose a demo role to explore</p>
            <Button
              variant="outline"
              className="w-full border-white/10 text-[#F5E6D3] hover:bg-white/5 rounded-full py-5"
              onClick={() => handleDemoLogin("client")}
              disabled={!!demoLoading}
            >
              <User className="w-4 h-4 mr-2" />
              {demoLoading === "client" ? "Loading..." : "Try as Client"}
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#E11D48]/30 text-[#F5E6D3] hover:bg-[#E11D48]/10 rounded-full py-5"
              onClick={() => handleDemoLogin("companion")}
              disabled={!!demoLoading}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              {demoLoading === "companion" ? "Loading..." : "Try as Companion"}
            </Button>
            <Button
              variant="outline"
              className="w-full border-amber-500/30 text-[#F5E6D3] hover:bg-amber-500/10 rounded-full py-5"
              onClick={() => handleDemoLogin("admin")}
              disabled={!!demoLoading}
            >
              <Crown className="w-4 h-4 mr-2" />
              {demoLoading === "admin" ? "Loading..." : "Try as Admin"}
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-[#9CA3AF] mt-6">
          <Link to="/" className="text-[#E11D48] hover:text-[#FB7185] transition-colors font-medium">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
