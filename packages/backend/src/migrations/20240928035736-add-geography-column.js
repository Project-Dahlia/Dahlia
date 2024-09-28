'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('ParkingSpots', 'geog', {
      type: Sequelize.GEOGRAPHY('POINT', 4326),
      allowNull: true
    });

    await queryInterface.sequelize.query(`
      UPDATE "ParkingSpots"
      SET "geog" = ST_SetSRID(ST_MakePoint("lng", "lat"), 4326)
    `);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('ParkingSpots', 'geog');
  }
};
