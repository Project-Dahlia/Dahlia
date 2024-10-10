// services/closestParkingSpot.js
const db = require('../models');
const ParkingSpots = db.ParkingSpots;
const { Sequelize } = db;
const { calculateDistance } = require('../utils/calculateDistance'); // Assuming this is the path to your utility

/**
 * Finds the closest parking spot within a specified distance from the given ID.
 * @param {number} id - The ParkingSpot ID.
 * @param {number} distance - The distance for the search (in meters).
 * @returns {object|null} - The closest parking spot coordinates or null if not found.
 */
const findClosestParkingSpot = async (id, distance) => {
  try {
    // Fetch the parking spot by its ID
    const spot = await ParkingSpots.findByPk(id, { attributes: ['geog'] });

    if (!spot || !spot.geog) {
      return null; // Return null if the parking spot or geographic data is missing
    }

    // Use Sequelize's raw query to find all nearby parking spots
    const query = `
      SELECT id, geog,
        ST_DistanceSphere(:geog, geog) AS distance
      FROM "ParkingSpots"
      WHERE ST_DWithin(:geog, geog, :distance)
        AND id != :id
      ORDER BY distance
      LIMIT 1;
    `;

    const result = await db.sequelize.query(query, {
      replacements: {
        geog: spot.geog,
        distance, // Distance in meters
        id // Exclude the original parking spot
      },
      type: Sequelize.QueryTypes.SELECT
    });

    if (result.length) {
      const closestSpot = result[0];

      // Optionally, you can calculate the distance using the imported utility function
      const calculatedDistance = calculateDistance(
        spot.geog.coordinates[1],
        spot.geog.coordinates[0],
        closestSpot.geog.coordinates[1],
        closestSpot.geog.coordinates[0]
      );

      // You can add this calculated distance to the closest spot object if desired
      closestSpot.calculatedDistance = calculatedDistance;

      return closestSpot; // Return the closest parking spot
    } else {
      return null; // Return null if no spots found within the distance
    }
  } catch (error) {
    console.error('Error finding closest parking spot:', error);
    throw error;
  }
};

module.exports = { findClosestParkingSpot };
