import { Outlet } from "react-router-dom";
import Nav2 from "./components/layout/Nav2"; // Your Navbar component
import SideBar from "./components/layout/SideBar/SideBar"; // Your Sidebar component

const Layout = () => {
  return (
    <div>
      <Nav2 />
      <div className="main-content">
        <SideBar />
        <div className="content">
          <Outlet /> {/* This will render the matched child route */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
