import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { AUTH_TOKEN_KEY } from "@/api/api-client";
import { authService } from "@/api/services/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  // Login Mutation using React Query
  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: () => authService.login({ email, password }),
    onSuccess: (data) => {
      if (data.data?.accessToken) {
        localStorage.setItem(AUTH_TOKEN_KEY, data.data.accessToken);
        navigate("/admin");
      } else {
        setFormError("Authentication failed: No token received.");
      }
    },
    onError: (error: unknown) => {
      const apiError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      const errorMsg =
        apiError.response?.data?.message ||
        apiError.message ||
        "Invalid credentials or server error. Please try again.";
      setFormError(errorMsg);
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email.trim() || !password.trim()) {
      setFormError("Please fill out all fields.");
      return;
    }

    handleLogin();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-kh-dark px-4 overflow-hidden font-sans select-none">
      {/* Background Glowing Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-kh-blue/20 rounded-full blur-[150px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-kh-pink/20 rounded-full blur-[150px] animate-pulse-glow pointer-events-none" />

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 lg:top-10 lg:left-10 flex items-center gap-2 text-white/60 hover:text-kh-pink transition-colors font-condensed tracking-widest text-sm uppercase cursor-pointer group"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        <span>BACK TO WEBSITE</span>
      </button>

      {/* Main Glassmorphic Card */}
      <div className="relative w-full max-w-[500px] bg-white/3 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl transition-all duration-300">
        {/* Logo and Header */}
        <div className="text-center mb-10">
          <div className="inline-flex text-5xl font-display font-black tracking-tighter leading-none mb-4">
            <span className="text-kh-blue">K</span>
            <span className="text-kh-pink">H</span>
          </div>
          <h2 className="font-display text-2xl lg:text-3xl text-white font-bold tracking-widest uppercase">
            ADMIN ACCESS
          </h2>
          <p className="text-zinc-500 font-condensed text-xs uppercase tracking-widest mt-1">
            Sign in to manage dynamic portfolio content
          </p>
        </div>

        {/* Error Alert Box */}
        {formError && (
          <div className="mb-6 flex items-start gap-3 p-4 bg-kh-red/10 border border-kh-red/20 text-red-400 text-xs rounded-lg animate-fade-in-up">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div className="leading-relaxed">{formError}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email Input Group */}
          <div className="space-y-2">
            <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg py-3.5 pl-12 pr-4 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-kh-pink focus:bg-white/[0.07] transition-all"
                required
              />
            </div>
          </div>

          {/* Password Input Group */}
          <div className="space-y-2">
            <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg py-3.5 pl-12 pr-12 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-kh-pink focus:bg-white/[0.07] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full relative flex items-center justify-center py-4 bg-gradient-to-r from-kh-pink to-kh-pink-bright text-white font-condensed font-bold tracking-widest uppercase rounded-lg hover:shadow-[0_0_30px_rgba(232,23,106,0.3)] disabled:opacity-70 disabled:cursor-not-allowed transition-all cursor-pointer text-sm"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                <span>AUTHENTICATING...</span>
              </span>
            ) : (
              <span>SIGN IN</span>
            )}
          </button>
        </form>

        {/* Footer Credit */}
        <div className="text-center mt-10">
          <p className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
            © {new Date().getFullYear()} KENNEDI HARRIS HOOPS
          </p>
        </div>
      </div>
    </div>
  );
}
