import React, { useState } from "react";
import AddEvent from "./AddEvent";
import "./Eventitems.css";

function NewEvents({ events }) {
  const [newEvents, setNewEvents] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleAddEvent = (addedEvent) => {
    setNewEvents((prev) => [...prev, addedEvent]); // Add the new event to state
  };

  return (
    <div className="new-events">
      <h2>New Events</h2>
      <AddEvent onAddEvent={handleAddEvent} />
      {newEvents.length > 0 ? (
        <ul>
          {newEvents.map((event, index) => (
            <li key={index} onClick={() => setSelectedEvent(event)}>
              <strong>{event.title}</strong> - {event.date}
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
