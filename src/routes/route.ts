import mainLayout from "@/layouts/mainLayout";
import About from "@/pages/about/About";
import BrandPartner from "@/pages/BrandPartner/BrandPartner";
import ContactPage from "@/pages/contact/ContactPage";
import GallaryPage from "@/pages/Gallary/GallaryPage";
import Highlights from "@/pages/Highlights/Highlights";
import Home from "@/pages/home/Home";
import MediaKit from "@/pages/MediaKit/MediaKit";
import Schedule from "@/pages/Schedule/Schedule";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: mainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/highlights",
        Component: Highlights,
      },
      {
        path: "/gallery",
        Component: GallaryPage,
      },
      {
        path: "/schedule",
        Component: Schedule,
      },
      {
        path: "/brand-partners",
        Component: BrandPartner,
      },
      {
        path: "/contact",
        Component: ContactPage,
      },
      {
        path: "/media-kit",
        Component: MediaKit,
      },
    ],
  },
]);
export default router;
