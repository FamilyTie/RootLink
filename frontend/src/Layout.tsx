import { Outlet } from "react-router-dom";
import SideBar from "./components/layout/SideBar/SideBar"; // Your Sidebar component
import MobileNav from "./components/layout/MobileNav/MobileNav";
import Header from "./components/layout/header";

const Layout = () => {
  return (
    <div className="w-screen overflow-hidden">
      <Header />
      <div className="main-content overflow-auto flex">
        <SideBar />
        <div className="content overflow-hidden w-screen">
          <Outlet /> {/* This will render the matched child route */}
        </div>
        
      </div>
      <div className="md:hidden">
      <MobileNav />
      </div>
      
    </div>
  );
};

export default Layout;
