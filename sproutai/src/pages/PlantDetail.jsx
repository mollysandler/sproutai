"use client";

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Droplet,
  Sun,
  Calendar,
  Edit2,
  Camera,
  X,
} from "lucide-react";
import { getPlantById, updatePlant } from "../utils/plantStorage";

export default function PlantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    type: "",
    health: "",
    care: {
      water: "",
      light: "",
      soil: "",
      temperature: "",
    },
  });

  useEffect(() => {
    const plantData = getPlantById(id);
    if (plantData) {
      setPlant(plantData);
    }
  }, [id]);

  useEffect(() => {
    if (plant) {
      setEditForm({
        name: plant.name,
        type: plant.type || "",
        health: plant.health,
        care: {
          water: plant.care.water,
          light: plant.care.light,
          soil: plant.care.soil,
          temperature: plant.care.temperature,
        },
      });
    }
  }, [plant]);

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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedPlant = updatePlant(Number(id), {
      ...plant,
      ...editForm,
      care: {
        ...plant.care,
        ...editForm.care,
      },
    });

    if (updatedPlant) {
      setPlant(updatedPlant);
      setIsEditing(false);
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

      {isEditing && (
        <div className="edit-mode">
          <div className="edit-mode-header">
            <h2>Edit Plant</h2>
            <button
              className="close-button"
              onClick={() => setIsEditing(false)}
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleEditSubmit} className="edit-form">
            <div className="form-row">
              <label htmlFor="name">Plant Name</label>
              <input
                type="text"
                id="name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="type">Plant Type</label>
              <input
                type="text"
                id="type"
                value={editForm.type}
                onChange={(e) =>
                  setEditForm({ ...editForm, type: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <label htmlFor="health">Health Status</label>
              <select
                id="health"
                value={editForm.health}
                onChange={(e) =>
                  setEditForm({ ...editForm, health: e.target.value })
                }
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="needs attention">Needs Attention</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="water">Watering Instructions</label>
              <input
                type="text"
                id="water"
                value={editForm.care.water}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    care: { ...editForm.care, water: e.target.value },
                  })
                }
              />
            </div>

            <div className="form-row">
              <label htmlFor="light">Light Requirements</label>
              <input
                type="text"
                id="light"
                value={editForm.care.light}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    care: { ...editForm.care, light: e.target.value },
                  })
                }
              />
            </div>

            <div className="edit-actions">
              <button
                type="button"
                className="action-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="action-button primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

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
