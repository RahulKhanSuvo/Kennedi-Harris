import { Navigate } from "react-router";
import { authService } from "@/api/services";

export default function AdminProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = authService.isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
