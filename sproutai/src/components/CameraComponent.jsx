"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, X, Check } from "lucide-react";

export default function CameraComponent({ onCapture, onClose }) {
  const [mode, setMode] = useState("initial");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (mode === "camera") {
      startCamera();
    }
    return () => {
      stopCamera(); // Cleanup on unmount
    };
  }, [mode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setMode("camera");
    } catch (err) {
      console.error("Error accessing camera:", err);
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
    stopCamera();
    onCapture(image);
  };

  return (
    <div className="camera-overlay">
      {mode === "initial" && (
        <div className="camera-initial">
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
                onClose();
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
    </div>
  );
}
