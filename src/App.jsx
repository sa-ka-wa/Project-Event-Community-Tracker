import React from "react";  
import SearchBar from "./Components/SearchBar";
import PastEvents from "./Components/PastEvents";
import NewEvents from "./Components/NewEvents";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div className="App">
      <h1>Event Finder</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NewEvents />
      <PastEvents />
    </div>
  );
}
export default App;
// This is the main App component that imports and uses the SearchBar, PastEvents, and NewEvents components.