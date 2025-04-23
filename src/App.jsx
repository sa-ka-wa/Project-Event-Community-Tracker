import React from "react";
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

function App() {
  const events = [
    { title: "Event 1", date: "2025-04-22" },
    { title: "Event 2", date: "2025-04-23" },
    { title: "Event 3", date: "2025-04-25" },
  ];

  const [searchTerm, setSearchTerm] = React.useState("");

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
                  <PastEvents events={pastEvents} />
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
