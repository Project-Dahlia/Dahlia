const db = require('../models');
const ParkingSpots = db.ParkingSpots;
const { Sequelize } = db;

const ClosestParkingSpot = async (id, distance) => {
  try {
    const spot = await ParkingSpots.findByPk(id, { attributes: ['geog'] });

    if (!spot || !spot.geog) {
      return null;
    }
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
        distance,
        id
      },
      type: Sequelize.QueryTypes.SELECT
    });

    if (result.length) {
      const closestSpot = result[0];

      return closestSpot;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error finding closest parking spot:', error);
    throw error;
  }
};

module.exports = { ClosestParkingSpot };
