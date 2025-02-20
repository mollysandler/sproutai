export default function Search() {
  const plants = [
    {
      id: 1,
      name: "Portulacaria Afra",
      type: "Dwarf Jade",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Crassula Ovata",
      type: "Classic Jade",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="search-container">
      <h1>Plant-Base</h1>

      <div className="search-box">
        <input type="search" placeholder="Search plants..." />
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
        {plants.map((plant) => (
          <div key={plant.id} className="plant-result-card">
            <div className="plant-info">
              <img
                src={plant.image || "/placeholder.svg"}
                alt={plant.name}
                className="plant-image"
                style={{ width: "80px", height: "80px" }}
              />
              <div className="plant-details">
                <h3>{plant.name}</h3>
                <p>{plant.type}</p>
                <button className="more-info-button">More Info</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
