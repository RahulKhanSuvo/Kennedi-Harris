import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function MainLayout() {
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
