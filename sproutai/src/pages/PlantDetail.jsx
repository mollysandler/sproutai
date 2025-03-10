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
import CameraComponent from "../components/CameraComponent";
import "../styles/plant-detail.css";
import "../styles/camera.css";
import "../styles/forms.css";
import { plants } from "./Search.jsx";

export default function PlantDetail() {
  // Add these new states
  const [showCamera, setShowCamera] = useState(false);
  const [plantPhoto, setPlantPhoto] = useState(null);
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

  const [isWatering, setIsWatering] = useState(false); // New loading state
  const [selectedPlantType, setSelectedPlantType] = useState(""); // New state for dropdown

  useEffect(() => {
    const plantData = getPlantById(id);
    if (plantData) {
      setPlant(plantData);
      setSelectedPlantType(plantData.type || ""); // Initialize dropdown with existing type
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

  const handleWatering = async () => {
    setIsWatering(true); // Start loading

    const today = new Date().toISOString().split("T")[0];
    const nextWatering = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    // Simulate an API call or processing time (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

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

    setIsWatering(false); // Stop loading
  };

  const handlePlantTypeChange = (e) => {
    setSelectedPlantType(e.target.value);
  };

  const handleSavePlantType = () => {
    // Update the plant's type in the database
    const updatedPlant = updatePlant(Number(id), {
      ...plant,
      type: selectedPlantType,
    });

    if (updatedPlant) {
      setPlant(updatedPlant);
      alert("Plant type saved!");
    } else {
      alert("Failed to save plant type.");
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

  const handlePhotoCapture = (photoData) => {
    setPlantPhoto(photoData);
    setShowCamera(false);

    // Update plant with new photo
    const updatedPlant = updatePlant(Number(id), {
      ...plant,
      photos: [
        {
          url: photoData,
          date: new Date().toISOString(),
          note: "Plant photo added",
        },
        ...(plant.photos || []),
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
            {/* ... (rest of the edit form) ... */}
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
            <p style={{ display: "flex", alignItems: "center", gap: "90px" }}>
              {new Date(plant.lastWatered).toLocaleDateString()}
              <button
                className="action-button primary"
                onClick={handleWatering}
                disabled={isWatering}
              >
                {isWatering ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <Droplet size={20} />
                    Log Watering
                  </>
                )}
              </button>
            </p>
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
      {/* Plant Type Dropdown */}
      <div className="plant-type-selection">
        <label htmlFor="plantType">Assign Plant Type:</label>
        <select
          id="plantType"
          value={selectedPlantType}
          onChange={handlePlantTypeChange}
        >
          <option value="">Select Plant Type</option>
          {plants.map((plantType) => (
            <option key={plantType.id} value={plantType.type}>
              {plantType.name} ({plantType.type})
            </option>
          ))}
        </select>
        <button className="action-button" onClick={handleSavePlantType}>
          Update Plant Type
        </button>
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

      <div className="plant-detail-section">
        <h2>Photos</h2>
        <div className="photos-grid">
          {plant.photos?.map((photo, index) => (
            <div key={index} className="photo-item">
              <img
                src={photo.url || "/placeholder.svg"}
                alt={`Plant photo ${index + 1}`}
              />
              <span className="photo-date">
                {new Date(photo.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="plant-detail-actions">
        <button className="action-button" onClick={() => setShowCamera(true)}>
          <Camera size={20} />
          Add Photo
        </button>
        <button
          className="action-button primary"
          onClick={handleWatering}
          disabled={isWatering}
        >
          {isWatering ? (
            <div className="spinner"></div>
          ) : (
            <>
              <Droplet size={20} />
              Log Watering
            </>
          )}
        </button>
      </div>

      {showCamera && (
        <CameraComponent
          onCapture={handlePhotoCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}
