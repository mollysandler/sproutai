// Default care template for new plants
const defaultCareTemplate = {
  water: "Water when soil is dry to touch",
  light: "Moderate to bright indirect light",
  humidity: "Average household humidity",
  soil: "Well-draining potting mix",
  fertilizer: "Monthly during growing season",
  temperature: "65-80°F (18-27°C)",
};

// Get all plants from localStorage
export const getPlants = () => {
  const plants = localStorage.getItem("plants");
  return plants
    ? JSON.parse(plants)
    : [
        {
          id: 1,
          name: "Fern Flower Five",
          icon: "🌿",
          type: "Boston Fern",
          acquired: "2023-12-15",
          lastWatered: "2024-02-18",
          nextWatering: "2024-02-22",
          health: "good",
          photos: [], // Add photos array
          care: {
            water: "Keep soil consistently moist",
            light: "Indirect bright light",
            humidity: "High humidity preferred",
            soil: "Well-draining potting mix",
            fertilizer: "Monthly during growing season",
            temperature: "60-75°F (15-24°C)",
          },
          notes: "Thriving in bathroom environment",
          history: [
            {
              date: "2024-02-18",
              action: "Watered",
              notes: "Added humidity tray",
            },
            {
              date: "2024-02-11",
              action: "Fertilized",
              notes: "Used balanced fertilizer",
            },
            {
              date: "2024-02-04",
              action: "Watered",
              notes: "Leaves looking healthy",
            },
          ],
        },
      ];
};

// Add a new plant to localStorage
export const addPlant = (plantData) => {
  const plants = getPlants();
  const newPlant = {
    id: Date.now(),
    icon: "🪴",
    type: "Unknown",
    acquired: new Date().toISOString().split("T")[0],
    lastWatered: new Date().toISOString().split("T")[0],
    nextWatering: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    health: "good",
    photos: [], // Add photos array
    care: defaultCareTemplate,
    notes: "",
    history: [
      {
        date: new Date().toISOString().split("T")[0],
        action: "Added",
        notes: "Plant added to garden",
      },
    ],
    ...plantData,
  };

  plants.push(newPlant);
  localStorage.setItem("plants", JSON.stringify(plants));
  return newPlant;
};

// Get a single plant by ID
export const getPlantById = (id) => {
  const plants = getPlants();
  return plants.find((plant) => plant.id === Number(id));
};

// Update a plant
export const updatePlant = (id, updateData) => {
  const plants = getPlants();
  const index = plants.findIndex((plant) => plant.id === Number(id));
  if (index !== -1) {
    plants[index] = { ...plants[index], ...updateData };
    localStorage.setItem("plants", JSON.stringify(plants));
    return plants[index];
  }
  return null;
};
