"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Droplet, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { getPlants } from "../utils/plantStorage";

export default function Schedule() {
  const [plants, setPlants] = useState([]);
  const [view, setView] = useState("upcoming"); // 'upcoming' or 'calendar'

  useEffect(() => {
    setPlants(getPlants());
  }, []);

  // Get all upcoming tasks sorted by date
  const getTasks = () => {
    const tasks = [];
    plants.forEach((plant) => {
      // Add watering task
      tasks.push({
        plantId: plant.id,
        plantName: plant.name,
        plantIcon: plant.icon,
        type: "water",
        date: new Date(plant.nextWatering),
        icon: <Droplet size={16} />,
        description: `Water ${plant.name}`,
      });

      // Add other care tasks based on plant's schedule
      if (plant.care.fertilizing) {
        tasks.push({
          plantId: plant.id,
          plantName: plant.name,
          plantIcon: plant.icon,
          type: "fertilize",
          date: new Date(plant.nextFertilizing),
          icon: <Wind size={16} />,
          description: `Fertilize ${plant.name}`,
        });
      }
    });

    return tasks.sort((a, b) => a.date - b.date);
  };

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  const tasks = getTasks();

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <Link to="/" className="back-button">
          <ArrowLeft size={24} />
        </Link>
        <h1>Care Schedule</h1>
      </div>

      <div className="schedule-view-toggle">
        <button
          className={`toggle-button ${view === "upcoming" ? "active" : ""}`}
          onClick={() => setView("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`toggle-button ${view === "calendar" ? "active" : ""}`}
          onClick={() => setView("calendar")}
        >
          Calendar
        </button>
      </div>

      {view === "upcoming" && (
        <div className="upcoming-tasks">
          {tasks.length === 0 ? (
            <div className="no-tasks">
              <Calendar size={48} />
              <p>No upcoming tasks</p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div key={index} className="task-item">
                <div className="task-date">{formatDate(task.date)}</div>
                <div className="task-content">
                  <div className="task-plant">
                    <span className="plant-icon">{task.plantIcon}</span>
                    <span className="plant-name">{task.plantName}</span>
                  </div>
                  <div className="task-info">
                    {task.icon}
                    <span>{task.description}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {view === "calendar" && (
        <div className="calendar-view">
          <p className="text-center text-muted">Calendar view coming soon!</p>
        </div>
      )}
    </div>
  );
}
