// app/events.page.jsx
'use client'

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    // Example events data
    { id: 1, name: 'Amapiano NYC Night', date: 'YYYY-MM-DD' },
  ]);
  // //mock data 
  // const mockEventsData = [
  //   {
  //     id: 1,
  //     name: 'Amapiano Vibes Night',
  //     date: '2024-03-28',
  //     location: 'Club XYZ, NYC',
  //     description: 'Experience the best of Amapiano with top DJs from around the world.',
  //   },
  //   {
  //     id: 2,
  //     name: 'Amapiano Rooftop Party',
  //     date: '2024-04-01',
  //     location: 'Rooftop Bar, NYC',
  //     description: 'Join us for an unforgettable night under the stars with the smooth sounds of Amapiano.',
  //   },
  //   {
  //     id: 3,
  //     name: 'AfroBeats Meets Amapiano',
  //     date: '2024-04-03',
  //     location: 'The AfroSpot, NYC',
  //     description: 'A unique blend of AfroBeats and Amapiano to keep you dancing all night long.',
  //   }
  // ];
  // Function to handle date change
  const handleDateChange = async (date) => {
    setSelectedDate(date);

    // call API route
    try {
      const res = await fetch(`/api/fetchEvents?date=${date.toISOString()}`);
      const fetchedEvents = await res.json();
      setEvents(fetchedEvents); // Update your component state with the fetched events
    } catch (error) {
      console.error("Failed to fetch events:", error);
      // Handle any errors, such as showing a user-friendly message
    }
  };



  const fetchEventsForWeekMock = async (startDate) => {
    // Simulate fetching data with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // For simplicity, we return the entire mock dataset here
        // In a real scenario, you would filter or fetch data based on the startDate
        resolve(mockEventsData);
      }, 1000); // Simulated delay of 1 second
    });
  };


  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col items-center w-full max-w-md mx-auto">
        {/* Hero Section */}
        <div className="hero" style={{
          backgroundImage: `url('https://yourimageurl.com/background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div>
              <h1 className="mb-5 text-5xl font-bold">Upcoming Amapiano Events in NYC</h1>
              <p className="mb-5">Discover the best Amapiano music events happening this week and weekend in New York City. Select a date to find events or browse all upcoming shows.</p>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => handleDateChange(date)}
                className="input input-bordered"

              />
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="container p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{event.name}</h2>
                  <p>Date: {event.date}</p>
                  <p>Location: {event.location}</p> {/* Added location */}
                  <p>{event.description}</p> {/* Added description */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
