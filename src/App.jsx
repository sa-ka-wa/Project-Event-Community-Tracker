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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

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

  const handleEventSelect = (event) => {
    setSelectedEvent(event); // Update selectedEvent state when event is clicked
  };

  const handleScroll = () => {
    const eventElements = document.querySelectorAll(".event-item");

    eventElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        const eventId = element.getAttribute("data-id");
        const event = events.find((event) => event.id === parseInt(eventId));

        // Only update selectedEvent if it's not already selected
        if (!selectedEvent || selectedEvent.id !== event.id) {
          setSelectedEvent(event);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [events, selectedEvent]);

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
                  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  <div className="events-container">
                    <div className="events-list">
                      <ErrorBoundary>
                        <NewEvents
                          events={newEvents}
                          setEvents={setEvents}
                          handleEventSelect={handleEventSelect} // Pass the handler for new events
                        />
                      </ErrorBoundary>
                      <ErrorBoundary>
                        <PastEvents
                          events={pastEvents}
                          setEvents={setEvents}
                          handleEventSelect={handleEventSelect} // Pass the handler for past events
                        />
                      </ErrorBoundary>
                    </div>
                    <div className="right-section">
                      <div className="event-details">
                        {selectedEvent ? (
                          <div>
                            <h2>{selectedEvent.title}</h2>
                            <p>{selectedEvent.description}</p>
                            <p>{selectedEvent.date}</p>

                            <p>{selectedEvent.location}</p>
                            <p>{selectedEvent.culture}</p>
                            <div>
                              {selectedEvent.image && (
                                <img
                                  src={selectedEvent.image}
                                  alt={selectedEvent.title}
                                  style={{
                                    width: "100%",
                                    maxWidth: "400px",
                                    height: "auto",
                                    marginTop: "10px",
                                  }}
                                />
                              )}
                            </div>

                          </div>
                        ) : (
                          <div>
                            <p>Select an event to see the details</p>
                            <img
                              src="src/pages/EVimage/download (1).jpg"
                              width="500px"
                              alt="Login visual"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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
