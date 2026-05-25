import { Outlet } from "react-router";
import SideBar from "@/components/common/SideBar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-kh-dark">
      <SideBar />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-[240px] pt-[64px] lg:pt-0 transition-all duration-300">
        <div className="min-h-screen p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
