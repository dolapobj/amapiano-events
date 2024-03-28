// pages/api/fetchEvents.js
import { fetchEventsForAllVenues } from '../../app/lib/fetchEvents';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  // look at events going on in the next 7 days
  const { date } = req.query;
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 7);

  try {
    const eventsData = await fetchEventsForAllVenues();
    const filteredEvents = eventsData
      .filter(event => {
        const eventDate = new Date(event.start.local);
        return eventDate >= startDate && eventDate <= endDate; // Check if event date is within the next 7 days
      })
      .filter(event => {
        const name =  event.name.text;
        const description =  event.description.text;
        const keywords = ['amapiano', 'afrobeats', 'carribean', 'african'];
        return keywords.some(keyword => name.toLowerCase().includes(keyword) || description.toLowerCase().includes(keyword));
      })
      .map(event => ({
        // Parse and reshape data 
        name: event.name.text,
        description: event.description.text,
        url: event.url,
        startDate: event.start.local, 
        endDate: event.end.local,
      }));

    res.status(200).json(filteredEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch events." });
  }
}
