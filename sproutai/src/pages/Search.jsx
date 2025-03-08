import { Link } from "react-router-dom";
import "../styles/plant-database.css";
import { useState } from "react";

export default function Search() {
  const plants = [
    {
      id: "african-violet",
      name: "African Violet",
      type: "Flowering Plant",
      image: "/african-violet.png", // You might want to update this path
    },
    {
      id: "jade-plant",
      name: "Jade Plant",
      type: "Succulent",
      image: "/jade-plant.png", // You might want to update this path
    },
    {
      id: "monstera-deliciosa",
      name: "Monstera Deliciosa",
      type: "Swiss Cheese Plant",
      image: "/monstera-deliciosa.jpg",
    },
    {
      id: "strelitzia-nicolai",
      name: "Strelitzia Nicolai",
      type: "Tropical",
      image: "/strelitzia nicolai.jpg",
    },
    {
      id: "ficus-lyrata",
      name: "Ficus Lyrata",
      type: "Foliage Plant",
      image: "/ficus lirata.jpg",
    },
    // {
    //   id: "calathea-orbifolia",
    //   name: "Calathea Orbifolia",
    //   type: "Foliage Plant",
    //   image: "/calathea orbifolia.jpg",
    // },
    // {
    //   id: "zamioculcas-zamiifolia",
    //   name: "Zamioculcas Zamiifolia",
    //   type: "Foliage Plant",
    //   image: "/zamioculcas zamifolia.jpg",
    // },
    // {
    //   id: "epipremnum-aureum",
    //   name: "Epipremnum Aureum",
    //   type: "Vine",
    //   image: "/epipremnum aureum.jpg",
    // },
    // {
    //   id: "spathiphyllum",
    //   name: "Spathiphyllum",
    //   type: "Flowering Plant",
    //   image: "/spathiphyllum.jpg",
    // },
    // {
    //   id: "sansevieria-trifasciata",
    //   name: "Sansevieria Trifasciata",
    //   type: "Succulent",
    //   image: "/Sansevieria Trifasciata.jpg",
    // },
    // {
    //   id: "philodendron-brasil",
    //   name: "Philodendron Brasil",
    //   type: "Vine",
    //   image: "/Philodendron Brasil.jpg",
    // },
    // {
    //   id: "maranta-leuconeura",
    //   name: "Maranta Leuconeura",
    //   type: "Foliage Plant",
    //   image: "/Maranta Leuconeura.jpg",
    // },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(plants);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filteredPlants = plants.filter((plant) =>
      plant.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredPlants);
  };

  return (
    <div className="search-container">
      <h1>Plant-Base</h1>

      <div className="search-box">
        <input
          type="search"
          placeholder="Search plants..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="search-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="plant-results">
        {searchResults.map((plant) => (
          <div key={plant.id} className="plant-result-card">
            <div className="plant-info">
              <img
                src={plant.image || "/placeholder.svg"}
                alt={plant.name}
                className="plant-image"
              />
              <div className="plant-details">
                <h3>{plant.name}</h3>
                <p>{plant.type}</p>
                <Link to={`/search/${plant.id}`} className="more-info-button">
                  More Info
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
