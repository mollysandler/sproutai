import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Garden from "./pages/Garden";
import Search from "./pages/Search";
import Help from "./pages/Help";
import PlantDetail from "./pages/PlantDetail";
import NewPlant from "./pages/NewPlant";
import PlantInfo from "./pages/PlantInfo";
import PlantOfTheDay from "./pages/PlantOfTheDay";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/plant-of-day" element={<PlantOfTheDay />} />
        <Route path="/garden/new" element={<NewPlant />} />
        <Route path="/garden/:id" element={<PlantDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:name" element={<PlantInfo />} />
        <Route path="/help" element={<Help />} />
      </Route>
    </Routes>
  );
}

export default App;
