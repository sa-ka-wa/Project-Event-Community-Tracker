import React from "react";

function PastEvents({ events }) {
  return (
    <div className="past-events">
      <h2>Past Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>{event.title}</strong> - {event.date}
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
