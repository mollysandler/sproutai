"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const plantDatabase = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    commonName: "Swiss Cheese Plant",
    image: "/placeholder.svg",
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
  },
  {
    id: 2,
    name: "Strelitzia Nicolai",
    commonName: "Bird of Paradise",
    image: "/placeholder.svg",
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
  },
  {
    id: 3,
    name: "Ficus Lyrata",
    commonName: "Fiddle Leaf Fig",
    image: "/placeholder.svg",
    description:
      "Popular for its large, violin-shaped leaves and striking appearance.",
    funFact: "In its natural habitat, it can grow up to 40-50 feet tall!",
    care: {
      light: "Bright, indirect light",
      water: "Water when top inch of soil is dry",
      humidity: "Average",
      temperature: "60-75°F (15-24°C)",
    },
  },
  {
    id: 4,
    name: "Calathea Orbifolia",
    commonName: "Round-Leaved Calathea",
    image: "/placeholder.svg",
    description: "Known for its stunning round leaves with silvery stripes.",
    funFact:
      "Calatheas are known as 'prayer plants' because their leaves move up at night and down during the day.",
    care: {
      light: "Medium, indirect light",
      water: "Keep soil consistently moist",
      humidity: "High humidity required",
      temperature: "65-75°F (18-24°C)",
    },
  },
  {
    id: 5,
    name: "Zamioculcas Zamiifolia",
    commonName: "ZZ Plant",
    image: "/placeholder.svg",
    description: "An extremely hardy plant with glossy, dark green leaves.",
    funFact:
      "Can survive in very low light conditions and go weeks without water.",
    care: {
      light: "Low to bright indirect light",
      water: "Allow to dry between waterings",
      humidity: "Any humidity level",
      temperature: "65-75°F (18-24°C)",
    },
  },
  {
    id: 6,
    name: "Epipremnum Aureum",
    commonName: "Pothos",
    image: "/placeholder.svg",
    description:
      "A versatile vine with heart-shaped leaves that's perfect for beginners.",
    funFact: "In the wild, pothos leaves can grow up to 3 feet wide!",
    care: {
      light: "Low to bright indirect light",
      water: "Allow top soil to dry",
      humidity: "Average",
      temperature: "60-80°F (15-27°C)",
    },
  },
  {
    id: 7,
    name: "Spathiphyllum",
    commonName: "Peace Lily",
    image: "/placeholder.svg",
    description:
      "Elegant white flowers and glossy green leaves make this a classic choice.",
    funFact: "NASA lists it as one of the best plants for cleaning indoor air.",
    care: {
      light: "Low to medium indirect light",
      water: "Keep soil lightly moist",
      humidity: "Average to high",
      temperature: "65-80°F (18-27°C)",
    },
  },
  {
    id: 8,
    name: "Sansevieria Trifasciata",
    commonName: "Snake Plant",
    image: "/placeholder.svg",
    description:
      "Striking upright leaves with beautiful patterns make this plant a modern classic.",
    funFact: "It's one of the few plants that release oxygen at night.",
    care: {
      light: "Any light level",
      water: "Allow to dry completely",
      humidity: "Any humidity level",
      temperature: "60-85°F (15-29°C)",
    },
  },
  {
    id: 9,
    name: "Philodendron Brasil",
    commonName: "Heart Leaf Philodendron",
    image: "/placeholder.svg",
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
  },
  {
    id: 10,
    name: "Maranta Leuconeura",
    commonName: "Prayer Plant",
    image: "/placeholder.svg",
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
  },
];

export default function PlantOfTheDay() {
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    // Get today's date components
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    // Create a seeded random number based on the date
    const seed = day + month * 31 + year * 365;
    const seededRandom = Math.sin(seed) * 10000;

    // Get a random index that will be consistent for the whole day
    const index = Math.floor(Math.abs(seededRandom) % plantDatabase.length);

    setPlant(plantDatabase[index]);
  }, []);

  if (!plant) return null;

  return (
    <div className="plant-of-day-container">
      <div className="plant-of-day-header">
        <Link to="/" className="back-button">
          <ArrowLeft size={24} />
        </Link>
        <h1>Plant of the Day</h1>
      </div>

      <div className="featured-plant">
        <div className="featured-image">
          <img src={plant.image || "/placeholder.svg"} alt={plant.name} />
        </div>

        <div className="featured-content">
          <h2>{plant.name}</h2>
          <h3>{plant.commonName}</h3>

          <div className="plant-description">
            <p>{plant.description}</p>
          </div>

          <div className="fun-fact">
            <h4>Fun Fact</h4>
            <p>{plant.funFact}</p>
          </div>

          <div className="care-overview">
            <h4>Care Guide</h4>
            <div className="care-grid">
              <div className="care-item">
                <span>Light</span>
                <p>{plant.care.light}</p>
              </div>
              <div className="care-item">
                <span>Water</span>
                <p>{plant.care.water}</p>
              </div>
              <div className="care-item">
                <span>Humidity</span>
                <p>{plant.care.humidity}</p>
              </div>
              <div className="care-item">
                <span>Temperature</span>
                <p>{plant.care.temperature}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
