import { Cog, Camera, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Plantify</h1>
        <Link to="/settings" className="icon-button">
          <Cog style={{ width: "24px", height: "24px" }} />
        </Link>
      </div>

      <div className="logo-container">
        <div className="logo-circle">
          <div className="logo-inner">
            <img
              src="/bruh.png"
              alt="Plant Logo"
              style={{ width: "80px", height: "80px", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      <div className="welcome-section">
        <h2>Welcome, Amelia!</h2>
      </div>

      <div className="main-buttons">
        <Link
          to="/schedule"
          className="main-button"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          View Reminders/Schedule
        </Link>
        <Link
          to="/plant-of-day"
          className="main-button"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Plant of the Day!
        </Link>
      </div>

      <div className="action-cards">
        <Link to="/search" className="action-card">
          <div className="card-content">
            <Search style={{ width: "32px", height: "32px" }} />
            <p>Search Plant Base</p>
          </div>
        </Link>
        <Link to="/help" className="action-card">
          <div className="card-content">
            <Camera style={{ width: "32px", height: "32px" }} />
            <p>Help My Plant</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
