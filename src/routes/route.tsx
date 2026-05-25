import About from "@/pages/about/About";
import BrandPartner from "@/pages/BrandPartner/BrandPartner";
import ContactPage from "@/pages/contact/ContactPage";
import GallaryPage from "@/pages/Gallary/GallaryPage";
import Highlights from "@/pages/Highlights/Highlights";
import Home from "@/pages/home/Home";
import MediaKit from "@/pages/MediaKit/MediaKit";
import Schedule from "@/pages/Schedule/Schedule";
import Login from "@/pages/login/Login";
import Dashboard from "@/pages/admin/Dashboard";
import AdminProtectedRoute from "@/components/common/AdminProtectedRoute";
import { createBrowserRouter, Navigate, Outlet } from "react-router";
import MainLayout from "@/layouts/mainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import HighlightsPanel from "@/pages/admin/components/HighlightsPanel";
import CreateHightlight from "@/pages/admin/components/CreateHightlight";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/highlights",
        element: <Highlights />,
      },
      {
        path: "/gallery",
        element: <GallaryPage />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/brand-partners",
        element: <BrandPartner />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/media-kit",
        element: <MediaKit />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <DashboardLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "highlights",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <HighlightsPanel />,
          },
          {
            path: "create",
            element: <CreateHightlight />,
          },
        ],
      },
    ],
  },
]);
export default router;
