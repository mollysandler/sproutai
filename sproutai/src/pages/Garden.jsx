import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Garden() {
  const plants = [
    { id: 1, name: "Fern Flower", icon: "🌿" },
    { id: 2, name: "Aloe Vera", icon: "🎋" },
    { id: 3, name: "Lavender", icon: "💐" },
    { id: 4, name: "Cactus", icon: "🌵" },
  ];

  return (
    <div className="garden-container">
      <div className="garden-header">
        <h1>My Garden</h1>
        <Link to="/garden/new" className="add-button">
          <PlusCircle style={{ width: "24px", height: "24px" }} />
        </Link>
      </div>

      <div className="plant-list">
        {plants.map((plant) => (
          <Link
            key={plant.id}
            to={`/garden/${plant.id}`}
            className="plant-card"
          >
            <span className="plant-icon">{plant.icon}</span>
            <span className="plant-name">{plant.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
