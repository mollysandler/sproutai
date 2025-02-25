"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, X, Check, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getPlants, updatePlant } from "../utils/plantStorage";

export default function Help() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("initial");
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [plants, setPlants] = useState([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Load plants when component mounts
  useEffect(() => {
    setPlants(getPlants());
  }, []);

  useEffect(() => {
    if (mode === "camera") {
      startCamera();
    }
    return () => {
      stopCamera(); // Cleanup on unmount
    };
  }, [mode]); // Run when mode changes

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true, // Let the browser choose the default camera
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setMode("camera");
    } catch (err) {
      console.error("Error accessing camera:", err);
      console.error("Error name:", err.name); // Get the error name
      console.error("Error message:", err.message); // Get the specific error message
      alert(
        "Unable to access camera. Please make sure you have granted camera permissions."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const image = canvas.toDataURL("image/jpeg");
    setCapturedImage(image);
    stopCamera();
    setMode("analysis");
    analyzeImage();
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    startCamera();
  };

  const [analysisResult, setAnalysisResult] = useState(null);

  // Simulate plant analysis - in a real app, this would call an AI service
  const analyzeImage = () => {
    // Simulated analysis delay
    setTimeout(() => {
      setAnalysisResult({
        condition: "needs attention",
        issues: ["Slight leaf drooping", "Minor brown spots"],
        recommendations: [
          "Water your plant twice a week",
          "Move to a location with more indirect sunlight",
          "Consider increasing humidity around the plant",
        ],
      });
    }, 1500);
  };

  const saveToHistory = () => {
    if (!selectedPlant) {
      alert("Please select a plant to save this analysis to.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const updatedPlant = updatePlant(selectedPlant.id, {
      health: analysisResult.condition,
      history: [
        {
          date: today,
          action: "Health Check",
          notes: `Issues: ${analysisResult.issues.join(
            ", "
          )}. Recommendations: ${analysisResult.recommendations.join(", ")}`,
        },
        ...selectedPlant.history,
      ],
    });

    if (updatedPlant) {
      navigate(`/garden/${selectedPlant.id}`);
    }
  };

  return (
    <div className="help-container">
      {mode === "initial" && (
        <div className="help-initial">
          <h1>Help My Plant</h1>
          <p>
            Take a photo of your plant and I'll help identify any issues and
            provide care recommendations.
          </p>
          <button className="camera-button" onClick={() => setMode("camera")}>
            <Camera size={24} />
            Open Camera
          </button>
        </div>
      )}

      {mode === "camera" && (
        <div className="camera-view">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="camera-preview"
          />
          <div className="camera-controls">
            <button
              className="camera-button secondary"
              onClick={() => {
                stopCamera();
                setMode("initial");
              }}
            >
              <X size={24} />
            </button>
            <button className="camera-button" onClick={capturePhoto}>
              <Check size={24} />
            </button>
          </div>
        </div>
      )}

      {mode === "analysis" && (
        <div className="analysis-view">
          <div className="analysis-header">
            <h1>Plant Analysis</h1>
          </div>

          <div className="captured-image-container">
            <img
              src={capturedImage || "/placeholder.svg"}
              alt="Captured plant"
              className="captured-image"
            />
          </div>

          {!analysisResult ? (
            <div className="analysis-loading">
              <div className="loading-spinner"></div>
              <p>Analyzing your plant...</p>
            </div>
          ) : (
            <div className="analysis-results">
              <div
                className={`condition-badge ${analysisResult.condition.replace(
                  " ",
                  "-"
                )}`}
              >
                <AlertTriangle size={20} />
                {analysisResult.condition}
              </div>

              <div className="analysis-section">
                <h2>Select Plant</h2>
                <select
                  className="plant-select"
                  value={selectedPlant?.id || ""}
                  onChange={(e) => {
                    const plant = plants.find(
                      (p) => p.id === Number(e.target.value)
                    );
                    setSelectedPlant(plant);
                  }}
                >
                  <option value="">Choose a plant...</option>
                  {plants.map((plant) => (
                    <option key={plant.id} value={plant.id}>
                      {plant.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="analysis-section">
                <h2>Identified Issues</h2>
                <ul className="issues-list">
                  {analysisResult.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>

              <div className="analysis-section">
                <h2>Recommendations</h2>
                <ul className="recommendations-list">
                  {analysisResult.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>

              <div className="analysis-actions">
                <Link
                  to="/garden"
                  className="action-button"
                  style={{ color: "black" }}
                >
                  View My Garden
                </Link>
                <button
                  className="action-button primary"
                  onClick={saveToHistory}
                  disabled={!selectedPlant}
                >
                  Save to Plant History
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
