import React from "react";
import AddEvent from "../ADEbuttons/Addevent";
import EventItem from "../ADEbuttons/Evenitems";
import "../ADEbuttons/Eventitems.css";

function NewEvents({ events, setEvents, handleEventSelect }) {
  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events.filter((event) => event.date >= today);

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const handleEditEvent = (updated) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === updated.id ? updated : event))
    );
  };

  return (
    <div className="new-events">
      <h2>New Events</h2>
      <AddEvent onAddEvent={handleAddEvent} />
      {events.length > 0 ? (
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
