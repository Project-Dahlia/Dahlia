const { DataTypes } = require('sequelize');
const sequelize = require('.database');

const ParkingSpot = sequelize.define(
  'ParkingSpot',
  {
    id: {
      type: DataTypes.STRING, // If `id` is always numeric, consider using DataTypes.INTEGER instead
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
      type: DataTypes.FLOAT, // Using FLOAT for latitude
      allowNull: false
    },
    lng: {
      type: DataTypes.FLOAT, // Using FLOAT for longitude
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
      type: DataTypes.FLOAT, // Assuming max_height is a decimal value
      allowNull: true
    },
    bike_racks: {
      type: DataTypes.STRING,
      allowNull: false
    },
    payment_methods: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Storing an array of strings
      allowNull: false
    },
    payment_options: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Storing an array of strings
      allowNull: false
    },
    rate_details: {
      type: DataTypes.JSON, // Storing the entire rate_details object as JSON
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
