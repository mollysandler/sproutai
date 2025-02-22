"use client";

import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { getPlants } from "../utils/plantStorage";
import { useEffect, useState } from "react";

export default function Garden() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    setPlants(getPlants());
  }, []);

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
            <div className="plant-info">
              <span className="plant-name">{plant.name}</span>
              <span
                className="plant-status"
                style={{
                  color:
                    plant.health === "excellent"
                      ? "#2e7d32"
                      : plant.health === "good"
                      ? "#1976d2"
                      : "#ed6c02",
                }}
              >
                {plant.health}
              </span>
            </div>
            <div className="plant-watering">
              Next water: {new Date(plant.nextWatering).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
