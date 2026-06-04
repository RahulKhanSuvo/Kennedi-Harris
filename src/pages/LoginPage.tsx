/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { toast } from "sonner";
import { KeyRound, Mail, Loader2, Sparkles } from "lucide-react";
import { authApi } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

const loginSchema = zod.object({
  email: zod.string().email("Please enter a valid email address"),
  password: zod.string().min(1, "Password is required"),
});

type LoginFormValues = zod.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await authApi.login({
        email: values.email,
        password: values.password,
      });

      if (response.success && response.data) {
        setAuth(response.data.accessToken, response.data.user);
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard/home"), 800);
      } else {
        toast.error(response.message || "Failed to authenticate");
      }
    } catch (error: any) {
      console.error(error);
      const errMsg =
        error.response?.data?.message ||
        "Invalid credentials or network failure";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050508] text-white flex items-center justify-center p-4 overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-0 right-0 left-0 bottom-0 hero-glow-pink opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 left-0 bottom-0 hero-glow-blue opacity-35 pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

      <Card className="w-full max-w-md bg-[#0c0c14] border border-white/5 shadow-2xl relative z-10 p-2 sm:p-4 rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-kh-pink/10 border border-kh-pink/20 rounded-xl flex items-center justify-center text-kh-pink mb-2">
            <Sparkles size={24} />
          </div>
          <CardTitle className="font-display text-4xl tracking-tight uppercase">
            Angela Daughter
          </CardTitle>
          <CardDescription className="font-condensed text-xs uppercase tracking-widest text-zinc-500">
            CMS Administrative Gateway
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Address */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="email">Email Address</Label>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Mail size={16} />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@kennediharris.com"
                  className="pl-10"
                  {...register("register" in register ? "email" : "email")} // register standard
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 font-condensed uppercase tracking-wider mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <KeyRound size={16} />
                </span>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  {...register("password")}
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 font-condensed uppercase tracking-wider mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Trigger */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center p-6 bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-black tracking-widest text-sm uppercase rounded-xl transition-all duration-300 active:scale-98 cursor-pointer border-none mt-2 shadow-lg shadow-kh-pink/20"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Securing Connection Matrix...
                </>
              ) : (
                "Authenticate & Initialize"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
