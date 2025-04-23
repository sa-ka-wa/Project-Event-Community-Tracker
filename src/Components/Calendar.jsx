import React, { useState } from "react";

function Calendar({ events }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

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

  // Change the month
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Change the year
  const changeYear = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(currentDate.getFullYear() + direction);
    setCurrentDate(newDate);
  };

  // 🛠️ Move the return inside the function body, not after a closing brace
  return (
    <div className="calendar">
      <h2>Calendar</h2>

      {/* Calendar Navigation */}
      <div className="calendar-navigation">
        <button onClick={() => changeYear(-1)}>&lt;&lt; Prev Year</button>
        <button onClick={() => changeMonth(-1)}>&lt; Prev Month</button>
        <span>
          {currentDate.toLocaleDateString("en-US", { year: "numeric", month: "long" })}
        </span>
        <button onClick={() => changeMonth(1)}>Next Month &gt;</button>
        <button onClick={() => changeYear(1)}>Next Year &gt;&gt;</button>
      </div>

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
