"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";
import { addPlant } from "../utils/plantStorage";
import CameraComponent from "../components/CameraComponent";

export default function NewPlant() {
  const navigate = useNavigate();
  const [showCamera, setShowCamera] = useState(false);
  const [plantPhoto, setPlantPhoto] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    size: "",
  });

  const handlePhotoCapture = (photoData) => {
    setPlantPhoto(photoData);
    setShowCamera(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlant = addPlant({
      name: formData.name,
      age: formData.age ? `${formData.age} days` : "Unknown",
      size: formData.size ? `${formData.size} inches` : "Unknown",
      photos: plantPhoto
        ? [
            {
              url: plantPhoto,
              date: new Date().toISOString(),
              note: "Initial plant photo",
            },
          ]
        : [],
    });
    navigate(`/garden/${newPlant.id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="new-plant-container">
      <div className="new-plant-header">
        <Link to="/garden" className="back-button">
          <ArrowLeft size={24} />
        </Link>
        <h1>New Plant</h1>
      </div>

      <form onSubmit={handleSubmit} className="new-plant-form">
        <div className="photo-upload" onClick={() => setShowCamera(true)}>
          {plantPhoto ? (
            <div className="photo-preview">
              <img src={plantPhoto || "/placeholder.svg"} alt="Plant preview" />
              <button
                type="button"
                className="retake-photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCamera(true);
                }}
              >
                Retake Photo
              </button>
            </div>
          ) : (
            <div className="photo-placeholder">
              <div className="photo-icon">
                <Camera size={32} />
              </div>
              <p>Add picture</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="name">
            Name:
            <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <div className="input-with-unit">
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
              min="0"
            />
            <span className="unit">days</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="size">Size:</label>
          <div className="input-with-unit">
            <input
              type="number"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="form-input"
              min="0"
              step="0.1"
            />
            <span className="unit">in</span>
          </div>
        </div>

        <div className="form-footer">
          <button
            type="submit"
            className="submit-button"
            disabled={!formData.name}
          >
            Add Plant
          </button>
        </div>
      </form>

      {showCamera && (
        <CameraComponent
          onCapture={handlePhotoCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}
