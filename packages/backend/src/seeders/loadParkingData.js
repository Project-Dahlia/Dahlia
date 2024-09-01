const fs = require('fs').promises;
const ParkingSpot = require('../../migrations/load-to-db');
const sequelize = require('../config/parking_config');

// Ensure tables are created or updated before seeding data
async function seedDatabase() {
  try {
    await sequelize.sync();
    console.log('Database & tables ready for seeding!');

    const data = await fs.readFile('../data/toronto-parking-2019.json', 'utf8');
    const jsonData = JSON.parse(data);
    const carparkArray = jsonData.carpark;

    const batchSize = 1000;
    for (let i = 0; i < carparkArray.length; i += batchSize) {
      const batch = carparkArray.slice(i, i + batchSize);

      try {
        await ParkingSpot.bulkCreate(batch);
        console.log(
          `Batch ${Math.floor(i / batchSize) + 1} inserted successfully`
        );
      } catch (err) {
        console.error(
          `Error inserting batch ${Math.floor(i / batchSize) + 1}:`,
          err
        );
      }
    }
  } catch (error) {
    console.error('Error syncing database or reading file:', error);
  }
}

seedDatabase();
