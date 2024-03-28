// app/components/events.server.js
import { useEffect, useState } from 'react';

export default function FetchEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('Your_Eventbrite_API_URL_here', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.EVENTBRITE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events); // Adjust according to the actual structure of the response
      }
    };

    fetchData();
  }, []);

  // Render your events or handle the data as needed
  return (
    <div>
      {/* Render your events here */}
    </div>
  );
}
