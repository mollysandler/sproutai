import { Outlet, Link } from "react-router-dom";
import { Search, Camera, Home, Leaf } from "lucide-react";

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
            <span className="nav-label">Home</span>
          </Link>
          <Link to="/search" className="nav-link">
            <Search size={24} />
            <span className="nav-label">Search</span>
          </Link>
          <Link to="/help" className="nav-link">
            <Camera size={24} />
            <span className="nav-label">Help</span>
          </Link>
          <Link to="/garden" className="nav-link">
            <Leaf size={24} />
            <span className="nav-label">Garden</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Layout;
