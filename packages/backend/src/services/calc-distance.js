const db = require('../models');
const ParkingSpots = db.ParkingSpots;
const { Sequelize } = db;

/**
 * Calculates the distance between two ParkingSpot IDs using their geographic coordinates.
 * @param {number} id1 - The first ParkingSpot ID.
 * @param {number} id2 - The second ParkingSpot ID.
 * @returns {number|null} - The distance in meters, or null if not calculable.
 */

const calculateDistance = async (id1, id2) => {
  try {
    // Fetch the two parking spots by their IDs
    const spot1 = await ParkingSpots.findByPk(id1, { attributes: ['geog'] });
    const spot2 = await ParkingSpots.findByPk(id2, { attributes: ['geog'] });

    // Check if both spots have geographic data
    if (!spot1 || !spot2 || !spot1.geog || !spot2.geog) {
      return null;
    }

    // Use Sequelize's raw query capabilities to compute the distance with ST_DistanceSphere
    const query = `
      SELECT ST_DistanceSphere(:geog1, :geog2) AS distance;
    `;

    const result = await db.sequelize.query(query, {
      replacements: {
        geog1: spot1.geog,
        geog2: spot2.geog
      },
      type: Sequelize.QueryTypes.SELECT
    });

    return result[0].distance;
  } catch (error) {
    console.error('Error calculating distance:', error);
    throw error;
  }
};

module.exports = { calculateDistance };
