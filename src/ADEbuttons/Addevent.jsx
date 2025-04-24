import React, { useState } from "react";
import { addEvent } from "../utils/eventService";

function AddEvent({ onAddEvent }) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedEvent = await addEvent(newEvent);
      onAddEvent(addedEvent); // Update parent component's state
      setNewEvent({ title: "", date: "" }); // Clear the form after adding
    } catch (err) {
      console.error("Failed to add event:", err);
    }
  };

  return (
    <div className="add-event">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            type="datetime-local"
            name="date"
            value={newEvent.date}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEvent;
