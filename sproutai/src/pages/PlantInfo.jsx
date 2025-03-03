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
        <img src={"/" + plantInfo.name + "2.png"} alt={plantInfo.name} />
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

const plantDatabase = {
  "african-violet": {
    name: "African Violet",
    description:
      "African violets are small, cheerful plants that produce clusters of violet, pink, or white flowers over fuzzy, dark green leaves. They make excellent houseplants and can bloom continuously when properly cared for.",
    image: null, // added image null
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
    funFact: null, // added funFact null
    commonName: null, // added commonName null
  },
  "jade-plant": {
    name: "Jade Plant",
    description:
      "Jade plants are succulent houseplants that are extremely popular and easy to grow. They have thick, woody stems and oval-shaped leaves that are also thick and glossy.",
    image: null, // added image null
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
    funFact: null, // added funFact null
    commonName: null, // added commonName null
  },
  "monstera-deliciosa": {
    name: "Monstera Deliciosa",
    commonName: "Swiss Cheese Plant",
    image: "/monstera-deliciosa.jpg",
    description:
      "Known for its distinctive leaves with natural holes, the Monstera deliciosa is a stunning tropical plant that can add a dramatic touch to any space.",
    funFact:
      "The holes in Monstera leaves are called fenestrations and help the plant survive strong winds in its natural habitat.",
    care: {
      light: "Bright, indirect light",
      water: "Allow top soil to dry between waterings",
      humidity: "Prefers high humidity",
      temperature: "65-85°F (18-29°C)",
    },
    commonIssues: [], // Add relevant issues if known.  Empty array is a good placeholder
    tips: [], // Add relevant tips if known. Empty array is a good placeholder
  },
  "strelitzia-nicolai": {
    name: "Strelitzia Nicolai",
    commonName: "Bird of Paradise",
    image: "/strelitzia nicolai.jpg",
    description:
      "A dramatic plant with large, banana-like leaves that can make any space feel like a tropical paradise.",
    funFact:
      "Named for its unique flowers that resemble exotic birds in flight.",
    care: {
      light: "Bright, direct light",
      water: "Keep soil consistently moist",
      humidity: "Average to high",
      temperature: "65-80°F (18-27°C)",
    },
    commonIssues: [],
    tips: [],
  },
  "ficus-lyrata": {
    name: "Ficus Lyrata",
    commonName: "Fiddle Leaf Fig",
    image: "/ficus lirata.jpg",
    description:
      "Popular for its large, violin-shaped leaves and striking appearance.",
    funFact: "In its natural habitat, it can grow up to 40-50 feet tall!",
    care: {
      light: "Bright, indirect light",
      water: "Water when top inch of soil is dry",
      humidity: "Average",
      temperature: "60-75°F (15-24°C)",
    },
    commonIssues: [],
    tips: [],
  },
  "calathea-orbifolia": {
    name: "Calathea Orbifolia",
    commonName: "Round-Leaved Calathea",
    image: "/calathea orbifolia.jpg",
    description: "Known for its stunning round leaves with silvery stripes.",
    funFact:
      "Calatheas are known as 'prayer plants' because their leaves move up at night and down during the day.",
    care: {
      light: "Medium, indirect light",
      water: "Keep soil consistently moist",
      humidity: "High humidity required",
      temperature: "65-75°F (18-24°C)",
    },
    commonIssues: [],
    tips: [],
  },
  "zamioculcas-zamiifolia": {
    name: "Zamioculcas Zamiifolia",
    commonName: "ZZ Plant",
    image: "/zamioculcas zamifolia.jpg",
    description: "An extremely hardy plant with glossy, dark green leaves.",
    funFact:
      "Can survive in very low light conditions and go weeks without water.",
    care: {
      light: "Low to bright indirect light",
      water: "Allow to dry between waterings",
      humidity: "Any humidity level",
      temperature: "65-75°F (18-24°C)",
    },
    commonIssues: [],
    tips: [],
  },
  "epipremnum-aureum": {
    name: "Epipremnum Aureum",
    commonName: "Pothos",
    image: "/epipremnum aureum.jpg",
    description:
      "A versatile vine with heart-shaped leaves that's perfect for beginners.",
    funFact: "In the wild, pothos leaves can grow up to 3 feet wide!",
    care: {
      light: "Low to bright indirect light",
      water: "Allow top soil to dry",
      humidity: "Average",
      temperature: "60-80°F (15-27°C)",
    },
    commonIssues: [],
    tips: [],
  },
  spathiphyllum: {
    name: "Spathiphyllum",
    commonName: "Peace Lily",
    image: "/spathiphyllum.jpg",
    description:
      "Elegant white flowers and glossy green leaves make this a classic choice.",
    funFact: "NASA lists it as one of the best plants for cleaning indoor air.",
    care: {
      light: "Low to medium indirect light",
      water: "Keep soil lightly moist",
      humidity: "Average to high",
      temperature: "65-80°F (18-27°C)",
    },
    commonIssues: [],
    tips: [],
  },
  "sansevieria-trifasciata": {
    name: "Sansevieria Trifasciata",
    commonName: "Snake Plant",
    image: "/Sansevieria Trifasciata.jpg",
    description:
      "Striking upright leaves with beautiful patterns make this plant a modern classic.",
    funFact: "It's one of the few plants that release oxygen at night.",
    care: {
      light: "Any light level",
      water: "Allow to dry completely",
      humidity: "Any humidity level",
      temperature: "60-85°F (15-29°C)",
    },
    commonIssues: [],
    tips: [],
  },
  "philodendron-brasil": {
    name: "Philodendron Brasil",
    commonName: "Heart Leaf Philodendron",
    image: "/Philodendron Brasil.jpg",
    description:
      "A cheerful trailing plant with variegated heart-shaped leaves.",
    funFact:
      "The 'Brasil' variety gets its name from its green and yellow colors, reminiscent of the Brazilian flag.",
    care: {
      light: "Medium to bright indirect light",
      water: "Allow top soil to dry",
      humidity: "Average to high",
      temperature: "65-80°F (18-27°C)",
    },
    commonIssues: [],
    tips: [],
  },
  "maranta-leuconeura": {
    name: "Maranta Leuconeura",
    commonName: "Prayer Plant",
    image: "/Maranta Leuconeura.jpg",
    description:
      "Features stunning patterned leaves that move throughout the day.",
    funFact:
      "The leaves fold up at night like hands in prayer, giving it its common name.",
    care: {
      light: "Medium indirect light",
      water: "Keep soil consistently moist",
      humidity: "High humidity",
      temperature: "65-75°F (18-24°C)",
    },
    commonIssues: [],
    tips: [],
  },
};
