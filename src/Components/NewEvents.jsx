import React from "react";

function NewEvents({ events }) {
  return (
    <div className="new-events">
      <h2>New Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
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
