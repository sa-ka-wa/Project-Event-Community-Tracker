import React, { useState } from "react";
import { editEvent, deleteEvent } from "../utils/eventService.js";

function EventItem({ event, onDeleteEvent, onEditEvent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState(event);

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

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmitEdit}>
          <input
            type="text"
            name="title"
            value={updatedEvent.title}
            onChange={handleEditChange}
          />
          <input
            type="datetime-local"
            name="date"
            value={updatedEvent.date}
            onChange={handleEditChange}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <strong>{event.title}</strong> - {event.date}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default EventItem;
