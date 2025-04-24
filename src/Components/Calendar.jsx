import React, { useState, useEffect } from "react";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  // Format selected date
  const formattedSelectedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : "";

  // Filter events for the selected date
  const filteredEvents = events.filter(
    (event) => event.date.split("T")[0] === formattedSelectedDate
  );

  // Change the month
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // 🔥 New: Change the year
  const changeYear = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(currentDate.getFullYear() + direction);
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar">
      <h2>Calendar</h2>

      {/* 🔁 Navigation for Month and Year */}
      <div className="calendar-navigation">
        <button onClick={() => changeYear(-1)}>&lt;&lt; Prev Year</button>
        <button onClick={() => changeMonth(-1)}>&lt; Prev Month</button>
        <span>
          {currentDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </span>
        <button onClick={() => changeMonth(1)}>Next Month &gt;</button>
        <button onClick={() => changeYear(1)}>Next Year &gt;&gt;</button>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Days of the Week */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={`header-${index}`} className="calendar-cell header">
            {day}
          </div>
        ))}

        {/* Empty Cells for Days Before the First Day of the Month */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-cell empty"></div>
        ))}

        {/* Days of the Month */}
        {days.map((day) => {
          const date = new Date(year, month, day).toISOString().split("T")[0];
          const hasEvents = events.some(
            (event) => event.date.split("T")[0] === date
          );

          return (
            <div
              key={day}
              className={`calendar-cell ${hasEvents ? "has-events" : ""} ${
                selectedDate &&
                selectedDate.toISOString().split("T")[0] === date
                  ? "selected"
                  : ""
              }`}
              onClick={() => setSelectedDate(new Date(year, month, day))}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Events for the Selected Date */}
      <div className="events">
        <h3>
          Events on{" "}
          {selectedDate ? selectedDate.toDateString() : "Select a Date"}
        </h3>
        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong> - {event.location}
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
