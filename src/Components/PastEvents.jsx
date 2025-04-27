import React, { useState, useEffect } from "react";
import EventItem from "../ADEbuttons/Evenitems";
import { editEvent, deleteEvent } from "../utils/eventService";
import "../ADEbuttons/Eventitems.css";

function PastEvents({ initialEvents, setEvents }) {
  const [events, setLocalEvents] = useState(initialEvents);

  useEffect(() => {
    setLocalEvents(initialEvents);
  }, [initialEvents]);

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
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={event.id}>
              <strong>{event.title}</strong> - {event.date}
              <EventItem
                event={event}
                onDeleteEvent={handleDeleteEvent}
                onEditEvent={handleEditEvent}
              />
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
