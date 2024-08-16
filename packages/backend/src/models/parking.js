'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../db-parking-spots');

// Define the ParkingSpot model
const Parking = sequelize.define(
  'Parking',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    lng: {
      type: DataTypes.DOUBLE,
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
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    max_height: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    bike_racks: {
      type: DataTypes.BOOLEAN,
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
      type: DataTypes.JSONB,
      allowNull: false
    },
    monthly_permit_status: {
      type: DataTypes.STRING,
      allowNull: true
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
      allowNull: false
    },
    alert_box: {
      type: DataTypes.STRING,
      allowNull: true
    },
    enable_streetview: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    streetview_lat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    streetview_long: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    streetview_yaw: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    streetview_pitch: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    streetview_zoom: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'carparks'
  }
);

module.exports = Parking;
