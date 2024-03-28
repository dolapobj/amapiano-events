// Test script within lib/fetchEvents.js or a separate test file
async function testFetch() {
  const venueId = "68643099"; // Use a real venueId for testing
  const apiUrl = `https://www.eventbriteapi.com/v3/venues/${venueId}/events/?status=live`;
  const apiToken = process.env.EVENTBRITE_API_TOKEN;
  console.log(process.env.EVENTBRITE_API_TOKEN);
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data); // Log the data to verify the response
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }
}

testFetch(); // Remember to remove or comment out this call for production
