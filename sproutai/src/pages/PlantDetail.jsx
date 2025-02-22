"use client";

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Droplet, Sun, Calendar, Edit2, Camera } from "lucide-react";
import { getPlantById, updatePlant } from "../utils/plantStorage";

export default function PlantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const plantData = getPlantById(id);
    if (plantData) {
      setPlant(plantData);
    }
  }, [id]);

  const handleWatering = () => {
    const today = new Date().toISOString().split("T")[0];
    const nextWatering = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const updatedPlant = updatePlant(Number(id), {
      lastWatered: today,
      nextWatering,
      history: [
        {
          date: today,
          action: "Watered",
          notes: "Regular watering",
        },
        ...plant.history,
      ],
    });

    if (updatedPlant) {
      setPlant(updatedPlant);
    }
  };

  if (!plant) {
    return (
      <div className="plant-detail">
        <div className="plant-detail-header">
          <Link to="/garden" className="back-button">
            <ArrowLeft size={24} />
          </Link>
          <h1>Plant not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="plant-detail">
      <div className="plant-detail-header">
        <Link to="/garden" className="back-button">
          <ArrowLeft size={24} />
        </Link>
        <h1>{plant.name}</h1>
        <button
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit2 size={24} />
        </button>
      </div>

      <div className="plant-detail-hero">
        <div className="plant-icon-large">{plant.icon}</div>
        <div
          className="plant-status-badge"
          style={{
            backgroundColor:
              plant.health === "excellent"
                ? "#e8f5e9"
                : plant.health === "good"
                ? "#e3f2fd"
                : "#fff3e0",
            color:
              plant.health === "excellent"
                ? "#2e7d32"
                : plant.health === "good"
                ? "#1976d2"
                : "#ed6c02",
          }}
        >
          {plant.health}
        </div>
      </div>

      <div className="plant-detail-info">
        <div className="info-row">
          <Droplet size={20} />
          <div>
            <h3>Last Watered</h3>
            <p>{new Date(plant.lastWatered).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="info-row">
          <Calendar size={20} />
          <div>
            <h3>Next Watering</h3>
            <p>{new Date(plant.nextWatering).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="info-row">
          <Sun size={20} />
          <div>
            <h3>Light Needs</h3>
            <p>{plant.care.light}</p>
          </div>
        </div>
      </div>

      <div className="plant-detail-section">
        <h2>Care Instructions</h2>
        <div className="care-instructions">
          <div className="care-item">
            <h3>Water</h3>
            <p>{plant.care.water}</p>
          </div>
          <div className="care-item">
            <h3>Soil</h3>
            <p>{plant.care.soil}</p>
          </div>
          <div className="care-item">
            <h3>Temperature</h3>
            <p>{plant.care.temperature}</p>
          </div>
        </div>
      </div>

      <div className="plant-detail-section">
        <h2>History</h2>
        <div className="history-list">
          {plant.history.map((entry, index) => (
            <div key={index} className="history-item">
              <div className="history-date">
                {new Date(entry.date).toLocaleDateString()}
              </div>
              <div className="history-content">
                <strong>{entry.action}</strong>
                <p>{entry.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="plant-detail-actions">
        <button className="action-button">
          <Camera size={20} />
          Add Photo
        </button>
        <button className="action-button primary" onClick={handleWatering}>
          <Droplet size={20} />
          Log Watering
        </button>
      </div>
    </div>
  );
}
