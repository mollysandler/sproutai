"use client";

import { useState } from "react";
import { ArrowLeft, Bell, Moon, User, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    username: "Amelia",
    location: "San Luis Obispo",
    temperatureUnit: "F",
    wateringReminders: true,
    fertilizingReminders: true,
  });

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    // In a real app, you'd save this to localStorage or a backend
    localStorage.setItem(
      "userSettings",
      JSON.stringify({
        ...settings,
        [key]: value,
      })
    );
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <Link to="/" className="back-button">
          <ArrowLeft size={24} />
        </Link>
        <h1>Settings</h1>
      </div>

      <div className="settings-sections">
        <section className="settings-section">
          <h2>
            <User size={20} />
            Profile
          </h2>
          <div className="settings-item">
            <label htmlFor="username">Display Name</label>
            <input
              type="text"
              id="username"
              value={settings.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          </div>
        </section>

        <section className="settings-section">
          <h2>
            <Globe size={20} />
            Location
          </h2>
          <div className="settings-item">
            <label htmlFor="location">City</label>
            <input
              type="text"
              id="location"
              value={settings.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>
          <div className="settings-item">
            <label htmlFor="temperatureUnit">Temperature Unit</label>
            <select
              id="temperatureUnit"
              value={settings.temperatureUnit}
              onChange={(e) => handleChange("temperatureUnit", e.target.value)}
            >
              <option value="F">Fahrenheit (°F)</option>
              <option value="C">Celsius (°C)</option>
            </select>
          </div>
        </section>

        <section className="settings-section">
          <h2>
            <Bell size={20} />
            Notifications
          </h2>
          <div className="settings-item">
            <label htmlFor="notifications">Enable Notifications</label>
            <label className="switch">
              <input
                type="checkbox"
                id="notifications"
                checked={settings.notifications}
                onChange={(e) =>
                  handleChange("notifications", e.target.checked)
                }
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="settings-item">
            <label htmlFor="wateringReminders">Watering Reminders</label>
            <label className="switch">
              <input
                type="checkbox"
                id="wateringReminders"
                checked={settings.wateringReminders}
                onChange={(e) =>
                  handleChange("wateringReminders", e.target.checked)
                }
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="settings-item">
            <label htmlFor="fertilizingReminders">Fertilizing Reminders</label>
            <label className="switch">
              <input
                type="checkbox"
                id="fertilizingReminders"
                checked={settings.fertilizingReminders}
                onChange={(e) =>
                  handleChange("fertilizingReminders", e.target.checked)
                }
              />
              <span className="slider round"></span>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
