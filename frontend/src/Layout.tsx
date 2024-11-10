import { Outlet } from "react-router-dom";
import Nav2 from "./components/layout/Nav2"; // Your Navbar component
import SideBar from "./components/layout/SideBar/SideBar"; // Your Sidebar component

const Layout = () => {
  return (
    <div className="w-screen overflow-hidden">
      <Nav2 />
      <div className="main-content overflow-auto flex">
      
        <SideBar />
        <div className="content overflow-hidden w-screen">
          <Outlet /> {/* This will render the matched child route */}
        </div>

        
      </div>
    </div>
  );
};

export default Layout;
