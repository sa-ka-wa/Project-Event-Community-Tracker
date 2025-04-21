import { useEffect, useState } from 'react';
import { getEvents, deleteEvent } from '../eventService';
import { Link } from 'react-router-dom';


export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  const handleDelete = async (id) => {
    await deleteEvent(id);
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="div">
      <h2 className="h2">All Events</h2>
      <Link to="/AddEvent" className="link">+ Create Event</Link>
      <ul className="ul">
        {events.map((event) => (
          <li key={event.id} className="li">
            <Link to={`/events/${event.id}`} className="link">{event.title}</Link>
            <div className="div">
              <Link to={`/EditEvent/${event.id}`} className="link">Edit</Link>
              <button onClick={() => handleDelete(event.id)} className="delete button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
