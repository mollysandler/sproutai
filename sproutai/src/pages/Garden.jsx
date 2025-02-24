"use client";

import { PlusCircle, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getPlants } from "../utils/plantStorage";
import { useState, useEffect } from "react";
import "../styles/garden.css";

export default function Garden() {
  const [plants, setPlants] = useState([]);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    setPlants(getPlants());
  }, []);

  const deletePlant = (id) => {
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    localStorage.setItem("plants", JSON.stringify(updatedPlants));
    setPlants(updatedPlants);
  };

  return (
    <div className="garden-container">
      <div className="garden-header">
        <h1>My Garden</h1>
        <div className="garden-actions">
          <button
            className="edit-button"
            onClick={() => setShowDelete(!showDelete)}
          >
            {showDelete ? "Done" : "Edit"}
          </button>
          <Link to="/garden/new" className="add-button">
            <PlusCircle style={{ width: "24px", height: "24px" }} />
          </Link>
        </div>
      </div>

      <div className="plant-list">
        {plants.map((plant) => (
          <div key={plant.id} className="plant-card-wrapper">
            <Link to={`/garden/${plant.id}`} className="plant-card">
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
            {showDelete && (
              <button
                className="delete-button"
                onClick={() => deletePlant(plant.id)}
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
