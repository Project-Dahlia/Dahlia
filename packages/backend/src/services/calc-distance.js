/* eslint-disable no-unused-vars */
const calculateDistance = async (id1, id2) => {
  try {
    const query = `
            SELECT 
                ST_DistanceSphere(
                (SELECT geog FROM "ParkingSpots" WHERE id = $1),
                (SELECT geog FROM "ParkingSpots" WHERE id = $2)
                ) AS distance;
        `;

    const result = await pool.query(query, [id1, id2]);
  } catch (err) {
    console.error(`Cannot execute query ${err} at this time`);
    throw err;
  }
};
