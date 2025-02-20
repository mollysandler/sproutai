import { Outlet, Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Camera } from "lucide-react";
import { Home } from "lucide-react";
import { Leaf } from "lucide-react";

function Layout() {
  return (
    <div className="app-container">
      <main>
        <Outlet />
      </main>
      <nav className="bottom-nav">
        <div className="nav-items">
          <Link to="/" className="nav-link">
            <Home size={24} />
          </Link>
          <Link to="/search" className="nav-link">
            <Search size={24} />
          </Link>
          <Link to="/help" className="nav-link">
            <Camera size={24} />
          </Link>
          <Link to="/garden" className="nav-link">
            <Leaf size={24} />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Layout;
