import { Navigate, Outlet } from "react-router";
import { apiService } from "@/lib/api";

export default function AdminProtectedRoute() {
  const isAuth = apiService.isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
