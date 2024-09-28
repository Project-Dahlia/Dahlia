'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ParkingSpots', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      p_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      lng: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      rate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      carpark_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      carpark_type_str: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_ttc: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      is_under_construction: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      changing_rates: {
        type: Sequelize.BOOLEAN
      },
      rate_half_hour: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      max_height: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      bike_racks: {
        type: Sequelize.STRING,
        allowNull: true
      },
      payment_methods: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      payment_options: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      rate_details: {
        type: Sequelize.JSON,
        allowNull: false
      },
      monthly_permit_status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      monthly_permit_quantity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      map_marker_logo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      alert_box: {
        type: Sequelize.STRING,
        allowNull: false
      },
      enable_streetview: {
        type: Sequelize.STRING,
        allowNull: false
      },
      streetview_lat: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      streetview_long: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      streetview_yaw: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      streetview_pitch: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      streetview_zoom: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('ParkingSpots');
  }
};
