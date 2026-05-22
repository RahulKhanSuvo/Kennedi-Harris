import mainLayout from "@/layouts/mainLayout";
import About from "@/pages/about/About";
import Highlights from "@/pages/Highlights/Highlights";
import Home from "@/pages/home/Home";
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
    ],
  },
]);
export default router;
