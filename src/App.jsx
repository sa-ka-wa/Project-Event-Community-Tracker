import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Event from "./pages/Events";
import About from "./pages/About";
import SearchBar from "./Components/SearchBar";
import PastEvents from "./Components/PastEvents";
import NewEvents from "./Components/NewEvents";
import Calendar from "./Components/Calendar";
import ErrorBoundary from "./ADEbuttons/Error.jsx";

function App() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const today = new Date().toISOString().split("T")[0];
  const pastEvents = filteredEvents.filter((event) => event.date < today);
  const newEvents = filteredEvents.filter((event) => event.date >= today);

  return (
    <>
      <Navbar />
      <div className="Container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/events"
            element={
              <>
                <div className="App">
                  <h1>Event Finder</h1>
                  <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                  <NewEvents events={newEvents} />
                  <ErrorBoundary>
                    <PastEvents initialEvents={events} setEvents={setEvents} />
                  </ErrorBoundary>
                  <Calendar events={filteredEvents} />
                </div>
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
