import { Outlet } from "react-router-dom";
import { Header } from "@/components";

const Layout = () => {
  return (
    <div className="relative flex h-dvh w-screen flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
