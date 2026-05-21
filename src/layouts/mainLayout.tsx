import { Outlet } from "react-router";

export default function mainLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>All rights reserved &copy; 2026</p>
      </footer>
    </>
  );
}
