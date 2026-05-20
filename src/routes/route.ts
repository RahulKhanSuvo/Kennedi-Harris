import mainLayout from "@/layouts/mainLayout";
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
            }
        ]
    },
])
export default router
