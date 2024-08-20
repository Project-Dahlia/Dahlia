const fs = require('fs');
const ParkingSpot = require('../models/ParkingSpot');

fs.readFile('path/to/your/file.json', 'utf8', (err, data) => {
  if (err) throw err;
  const jsonData = JSON.parse(data);
  const carparkArray = jsonData.carpark;

  // Insert the data in batches
  const batchSize = 1000; // Adjust batch size as needed
  for (let i = 0; i < carparkArray.length; i += batchSize) {
    const batch = carparkArray.slice(i, i + batchSize);
    ParkingSpot.bulkCreate(batch)
      .then(() =>
        console.log(`Batch ${i / batchSize + 1} inserted successfully`)
      )
      .catch((err) =>
        console.error(`Error inserting batch ${i / batchSize + 1}:`, err)
      );
  }
});
