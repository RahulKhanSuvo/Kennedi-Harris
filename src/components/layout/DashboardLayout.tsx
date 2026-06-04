import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-kh-dark text-white flex">
      {/* Sidebar - fixed on desktop */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[240px] transition-all duration-300">
        {/* Navbar */}
        <Navbar />

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 mt-[64px] overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
