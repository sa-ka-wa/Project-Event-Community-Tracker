import React, { useState } from "react";
import EventItem from "../ADEbuttons/Evenitems";
import "../ADEbuttons/Eventitems.css";

function NewEvents({ events, setEvents, handleEventSelect, handleAddEvent }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [culture, setCulture] = useState("");
  const [image, setImage] = useState(null); // Image state

  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events.filter((event) => event.date >= today);

  console.log("Upcoming Events:", upcomingEvents); // Debug log

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleAddEventForm = (event) => {
    event.preventDefault();

    const newEvent = {
      id: Date.now(), // Unique ID
      title,
      description,
      date,
      location,
      
      image, // Include image in new event
    };

    console.log("New Event Image:", image); // Debug log
    console.log("New Event:", newEvent); // Debug log

    handleAddEvent(newEvent); // Pass the new event to the parent component (App)

    // Optionally clear the form after submitting
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
    
    setImage(null); // Clear image preview
  };

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };

  return (
    <div className="new-events">
      <h2>New Events</h2>

      {/* Event creation form */}
      <form onSubmit={handleAddEventForm}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
       
        <div>
          <label>Event Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit">Add Event</button>
      </form>

      {/* List of upcoming events */}
      {upcomingEvents.length > 0 ? (
        <ul>
          {upcomingEvents.map((event) => (
            <li key={event.id} onClick={() => handleEventSelect(event)}>
              <EventItem
                event={event}
                onDeleteEvent={handleDeleteEvent}
                onEditEvent={handleEditEvent}
              />
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming events.</p>
      )}
    </div>
  );
}

export default NewEvents;
