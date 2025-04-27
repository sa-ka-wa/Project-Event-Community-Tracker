import React, { useState, useEffect } from "react";
import EventItem from "../ADEbuttons/Evenitems";
import { editEvent, deleteEvent } from "../utils/eventService";
import "../ADEbuttons/Eventitems.css";

function PastEvents({ events, setEvents, handleEventSelect }) {
  const [localEvents, setLocalEvents] = useState(events);

  useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const handleDeleteEvent = (deletedEventId) => {
    deleteEvent(deletedEventId);
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== deletedEventId)
    );
  };

  const handleEditEvent = (editedEvent) => {
    editEvent(editedEvent);
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === editedEvent.id ? editedEvent : event
      )
    );
  };

  return (
    <div className="past-events">
      <h2>Past Events</h2>
      {localEvents.length > 0 ? (
        <ul>
          {localEvents.map((event) => (
            <li key={event.id} onClick={() => handleEventSelect(event)}>
              <strong>{event.title}</strong> - {event.date}
              <EventItem
                event={event}
                onDeleteEvent={handleDeleteEvent}
                onEditEvent={handleEditEvent}
              />
              {/* Render image for past events */}
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  style={{ width: "150px", height: "auto", marginTop: "10px" }}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No past events.</p>
      )}
    </div>
  );
}

export default PastEvents;
