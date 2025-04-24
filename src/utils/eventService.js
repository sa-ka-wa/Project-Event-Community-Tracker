export async function addEvent(newEvent) {
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
  });

  if (!response.ok) {
    throw new Error("Failed to add event");
  }

  const data = await response.json();
  return data;
}

export async function deleteEvent(eventId) {
  const response = await fetch(`http://localhost:3000/events/${eventId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete event");
  }

  return eventId; // return the id for the successful delete
}

export async function editEvent(eventId, updatedEvent) {
  const response = await fetch(`http://localhost:3000/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEvent),
  });

  if (!response.ok) {
    throw new Error("Failed to update event");
  }

  const data = await response.json();
  return data;
}
