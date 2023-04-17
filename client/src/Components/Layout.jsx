import NavBar from "./navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../CSS/Layout.css"

const Layout = () => {
    return (
        <div className="main-layout-container">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
