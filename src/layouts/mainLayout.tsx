import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useQuery } from "@tanstack/react-query";
import { homeService } from "@/api/services";
import Preloader from "@/components/common/Preloader";

export default function MainLayout() {
  const { isLoading } = useQuery({
    queryKey: ["home-active"],
    queryFn: homeService.getActiveHome,
    staleTime: Infinity,
  });

  if (isLoading) return <Preloader />;

  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <ScrollRestoration />
    </>
  );
}
