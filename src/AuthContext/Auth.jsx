import React from "react";
// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// src/context/EventContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch('http://localhost:3000/events');
    const data = await res.json();
    setEvents(data);

    const now = new Date();
    const past = data.filter((event) => new Date(event.date) < now);
    const upcoming = data.filter((event) => new Date(event.date) >= now);
    setPastEvents(past);
    setUpcomingEvents(upcoming);
  };

  const addEvent = async (newEvent) => {
    const res = await fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
    const data = await res.json();
    setEvents([...events, data]);
    fetchEvents();
  };

  const deleteEvent = async (id) => {
    await fetch(`http://localhost:3000/events/${id}`, {
      method: 'DELETE',
    });
    setEvents(events.filter((event) => event.id !== id));
    fetchEvents();
  };

  const updateEvent = async (updatedEvent) => {
    const res = await fetch(`http://localhost:3000/events/${updatedEvent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    });
    const data = await res.json();
    setEvents(events.map((event) => (event.id === data.id ? data : event)));
    fetchEvents();
  };

  return (
    <EventContext.Provider value={{ events, pastEvents, upcomingEvents, fetchEvents, addEvent, deleteEvent, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
