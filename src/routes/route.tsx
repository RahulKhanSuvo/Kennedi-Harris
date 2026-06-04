import About from "@/pages/about/About";
import BrandPartner from "@/pages/BrandPartner/BrandPartner";
import ContactPage from "@/pages/contact/ContactPage";
import GallaryPage from "@/pages/Gallary/GallaryPage";
import Highlights from "@/pages/Highlights/Highlights";
import Home from "@/pages/home/Home";
import MediaKit from "@/pages/MediaKit/MediaKit";
import Schedule from "@/pages/Schedule/Schedule";
import NotFound from "@/pages/NotFound/NotFound";

// Admin Dashboard Components
import LoginPage from "@/pages/LoginPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import HomePage from "@/pages/HomePage";
import HighlightsPage from "@/pages/HighlightsPage";
import AboutPage from "@/pages/AboutPage";
import GalleryPage from "@/pages/GalleryPage";
import ContactDashboardPage from "@/pages/ContactPage";
import FooterPage from "@/pages/FooterPage";

import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "@/layouts/mainLayout";

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
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/home" replace />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "highlights",
        element: <HighlightsPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "contact",
        element: <ContactDashboardPage />,
      },
      {
        path: "footer",
        element: <FooterPage />,
      },
    ],
  },
  // Redirect old /admin route to the new /dashboard route
  {
    path: "/admin",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/admin/*",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
