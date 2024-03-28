// lib/fetchEvents.js
import venueIds from './savedVenueIds.json';
async function fetchEventsForVenue(venueId) {
  const apiUrl = `https://www.eventbriteapi.com/v3/venues/${venueId}/events/?status=live`;
  const apiToken = process.env.EVENTBRITE_API_TOKEN;
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching events for venue ${venueId}: ${response.status}`);
    }

    const data = await response.json();
    return data.events; // Assuming the API response has an `events` array
  } catch (error) {
    console.error(`Failed to fetch events for venue ${venueId}:`, error);
    throw error;
  }
}
  
// Function to fetch events for all venues and aggregate results
export async function fetchEventsForAllVenues() {
  const allEvents = await Promise.all(venueIds.map(fetchEventsForVenue));
  return allEvents.flat(); // Flatten the array of events arrays into a single array
}

