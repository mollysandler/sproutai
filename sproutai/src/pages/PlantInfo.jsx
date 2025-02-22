"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PlantInfo() {
  const { name } = useParams();
  const [plantInfo, setPlantInfo] = useState(null);

  useEffect(() => {
    // This would typically fetch from an API - using mock data for demo
    setPlantInfo(plantDatabase[name] || null);
  }, [name]);

  if (!plantInfo) {
    return (
      <div className="plant-info-container">
        <div className="plant-info-header">
          <Link to="/search" className="back-button">
            <ArrowLeft size={24} />
          </Link>
          <h1>Plant Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="plant-info-container">
      <div className="plant-info-header">
        <Link to="/search" className="back-button">
          <ArrowLeft size={24} />
        </Link>
        <h1>{plantInfo.name}</h1>
      </div>

      <div className="plant-info-image">
        <img src={plantInfo.image || "/placeholder.svg"} alt={plantInfo.name} />
      </div>

      <div className="plant-info-content">
        <section className="info-section">
          <h2>About</h2>
          <p>{plantInfo.description}</p>
        </section>

        <section className="info-section">
          <h2>Care Requirements</h2>
          <div className="care-grid">
            <div className="care-item">
              <h3>Light</h3>
              <p>{plantInfo.care.light}</p>
            </div>
            <div className="care-item">
              <h3>Water</h3>
              <p>{plantInfo.care.water}</p>
            </div>
            <div className="care-item">
              <h3>Temperature</h3>
              <p>{plantInfo.care.temperature}</p>
            </div>
            <div className="care-item">
              <h3>Humidity</h3>
              <p>{plantInfo.care.humidity}</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>Common Issues</h2>
          <ul className="issues-list">
            {plantInfo.commonIssues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </section>

        <section className="info-section">
          <h2>Tips</h2>
          <ul className="tips-list">
            {plantInfo.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

// Mock plant database - in a real app, this would come from an API
const plantDatabase = {
  "african-violet": {
    name: "African Violet",
    description:
      "African violets are small, cheerful plants that produce clusters of violet, pink, or white flowers over fuzzy, dark green leaves. They make excellent houseplants and can bloom continuously when properly cared for.",
    care: {
      light: "Bright, indirect light. Avoid direct sunlight.",
      water:
        "Keep soil consistently moist but not waterlogged. Water from the bottom to avoid leaf damage.",
      temperature: "65-75°F (18-24°C)",
      humidity: "High humidity, 50-60%",
    },
    commonIssues: [
      "Leaves turning yellow from overwatering",
      "Brown spots from water on leaves",
      "Lack of blooming due to insufficient light",
      "Crown rot from water in the center of the plant",
    ],
    tips: [
      "Use room temperature water to avoid shocking the roots",
      "Rotate the plant regularly for even growth",
      "Remove dead or damaged leaves and spent blooms promptly",
      "Use African violet-specific potting mix for best results",
    ],
  },
  "jade-plant": {
    name: "Jade Plant",
    description:
      "Jade plants are succulent houseplants that are extremely popular and easy to grow. They have thick, woody stems and oval-shaped leaves that are also thick and glossy.",
    care: {
      light:
        "Bright, direct to indirect light. At least 6 hours of sunlight daily.",
      water:
        "Allow soil to dry completely between waterings. Reduce watering in winter.",
      temperature: "65-75°F (18-24°C)",
      humidity: "Low humidity is fine",
    },
    commonIssues: [
      "Leaf drop from overwatering",
      "Shriveled leaves from underwatering",
      "Leggy growth from insufficient light",
      "Root rot in poorly draining soil",
    ],
    tips: [
      "Use well-draining succulent soil mix",
      "Prune regularly to maintain shape and promote bushiness",
      "Can be propagated easily from leaf or stem cuttings",
      "Fertilize sparingly during growing season only",
    ],
  },
};
