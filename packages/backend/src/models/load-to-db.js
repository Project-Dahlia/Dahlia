const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ParkingSpot = sequelize.define(
  'ParkingSpot',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    rate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carpark_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carpark_type_str: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_ttc: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_under_construction: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    changing_rates: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    rate_half_hour: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    max_height: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    bike_racks: {
      type: DataTypes.STRING,
      allowNull: false
    },
    payment_methods: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    payment_options: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    rate_details: {
      type: DataTypes.JSON,
      allowNull: true
    },
    monthly_permit_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monthly_permit_quantity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    monthly_permit_price: {
      type: DataTypes.STRING,
      allowNull: true
    },
    map_marker_logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alert_box: {
      type: DataTypes.STRING,
      allowNull: true
    },
    enable_streetview: {
      type: DataTypes.STRING,
      allowNull: false
    },
    streetview_lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    streetview_long: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    streetview_yaw: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    streetview_pitch: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    streetview_zoom: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    tableName: 'parking_spots',
    timestamps: false
  }
);

module.exports = ParkingSpot;
