import React, { useState } from "react";
import { editEvent, deleteEvent } from "../utils/eventService.js";
import "./Eventitems.css";

function EventItem({ event, onDeleteEvent, onEditEvent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState(event);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const editedEvent = await editEvent(event.id, updatedEvent);
      onEditEvent(editedEvent); // Update parent state with the edited event
      setIsEditing(false); // Close editing mode
    } catch (err) {
      console.error("Failed to edit event:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(event.id);
      onDeleteEvent(event.id); // Update parent state after deletion
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };
  const handleImageClick = () => {
    setIsExpanded(!isExpanded);
  };

  const hasImage = event.imageUrl && event.imageUrl.trim() !== "";

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmitEdit} className="event-form">
          <input
            type="text"
            name="title"
            value={updatedEvent.title}
            onChange={handleEditChange}
            placeholder="Title"
            className="event-input"
          />
          <input
            type="datetime-local"
            name="date"
            value={updatedEvent.date}
            onChange={handleEditChange}
            className="event-input"
          />
          <input
            type="text"
            name="imageUrl"
            value={updatedEvent.imageUrl || ""}
            onChange={handleEditChange}
            placeholder="Image URL"
            className="event-input"
          />
          <button type="submit" className="event-button">
            Save
          </button>
        </form>
      ) : (
        <>
          {hasImage ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              onClick={handleImageClick}
              className="event-image"
            />
          ) : (
            <div onClick={handleImageClick} className="event-placeholder">
              No Image
            </div>
          )}
          <div className="event-details">
            <strong>{event.title}</strong> - {event.date}
          </div>
          <div className="event-buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default EventItem;
