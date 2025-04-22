import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Event from "./pages/Events";
import About from "./pages/About";
import React from "react";
import SearchBar from "./Components/SearchBar";
import PastEvents from "./Components/PastEvents";
import NewEvents from "./Components/NewEvents";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <>
      <Navbar />
      <div className="Container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Event />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <div className="App">
        <h1>Event Finder</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <NewEvents />
        <PastEvents />
      </div>
    </>
  );
}

export default App;
