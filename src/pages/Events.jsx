import React from "react";
import SearchBar from "../Components/SearchBar";
import NewEvents from "../Components/NewEvents";
import PastEvents from "../Components/PastEvents";
import Calendar from "../Components/Calendar";
import ErrorBoundary from "../ADEbuttons/Error.jsx";

const EventPage = ({ events, searchTerm, setSearchTerm }) => {
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const today = new Date().toISOString().split("T")[0];
  const pastEvents = filteredEvents.filter((event) => event.date < today);
  const newEvents = filteredEvents.filter((event) => event.date >= today);

  return (
    <div className="App">
      <h1>Event Finder</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NewEvents events={newEvents} />
      <ErrorBoundary>
        <PastEvents events={pastEvents} />
      </ErrorBoundary>
      <Calendar events={filteredEvents} />
    </div>
  );
};

export default EventPage;
