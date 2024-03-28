const fs = require("fs");
const path = require("path");

// Path to your directory containing JSON files
const directoryPath = path.join(__dirname, "../../eventbriteJsons");

// Function to extract IDs from the parsed JSON
function extractIdsFromJson(jsonData) {
  // Assuming each file's structure allows direct extraction like this; adjust as needed
  if (Array.isArray(jsonData.events)) {
    return jsonData.events.map((event) => event.venue_id);
  } else {
    // Handle the case where jsonData.events is not as expected
    console.warn("jsonData.events is not an array or is undefined");
    return [];
  }
}

// Read all files in the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  // Filter to keep only .json files if needed
  files = files.filter((file) => path.extname(file) === ".json");

  const allIds = [];

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileContents);
    const ids = extractIdsFromJson(jsonData);
    allIds.push(...ids); // Collect ids from each file
  });

  // Now `allIds` contains all the IDs extracted from each JSON file
  console.log(allIds);
  const outputPath = path.join(__dirname, "savedVenueIds.json");

  // Assuming `allIds` is your array of venue IDs
  const dataToSave = JSON.stringify(allIds, null, 2);

  fs.writeFileSync(outputPath, dataToSave, "utf8");
  console.log("Venue IDs saved to", outputPath);

  // Further processing, such as saving these IDs to another file or using them in API calls
});
