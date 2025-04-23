import React, { useState } from "react";

function Calendar({ events }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Format selected date
  const formattedSelectedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-CA")
    : "";

  // Filter events for selected date
  const filteredEvents = events.filter(
    (event) => event.date === formattedSelectedDate
  );

  // 🛠️ Move the return inside the function body, not after a closing brace
  return (
    <div className="calendar">
      <h2>Calendar</h2>

      {/* Weekday headers */}
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={`header-${index}`} className="calendar-cell header">
            {day}
          </div>
        ))}

        {/* Empty cells before first day */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-cell empty"></div>
        ))}

        {/* Days of the month */}
        {days.map((day) => {
          const date = new Date(year, month, day);
          const dateStr = date.toLocaleDateString("en-CA");
          const isSelected =
            selectedDate &&
            selectedDate.toDateString() === date.toDateString();
          const hasEvents = events.some((event) => event.date === dateStr);

          return (
            <div
              key={day}
              className={`calendar-cell ${isSelected ? "selected" : ""} ${
                hasEvents ? "has-events" : ""
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Events list */}
      <div className="events">
        <h3>
          Events on{" "}
          {selectedDate ? selectedDate.toDateString() : "Select a Date"}
        </h3>
        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map((event, index) => (
              <li key={index}>
                <strong>{event.title}</strong> - {event.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events for this date.</p>
        )}
      </div>
    </div>
  );
}

export default Calendar;
