/* eslint-disable no-unused-vars */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParkingSpots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ParkingSpots.init(
    {
      id: DataTypes.STRING,
      slug: DataTypes.STRING,
      address: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      rate: DataTypes.STRING,
      carpark_type: DataTypes.STRING,
      carpark_type_str: DataTypes.STRING,
      is_ttc: DataTypes.BOOLEAN,
      is_under_construction: DataTypes.BOOLEAN,
      changing_rates: DataTypes.BOOLEAN,
      rate_half_hour: DataTypes.FLOAT,
      capacity: DataTypes.INTEGER,
      max_height: DataTypes.FLOAT,
      bike_racks: DataTypes.STRING,
      payment_methods: DataTypes.ARRAY(DataTypes.STRING),
      payment_options: DataTypes.ARRAY(DataTypes.STRING),
      rate_details: DataTypes.JSON,
      monthly_permit_status: DataTypes.STRING,
      monthly_permit_quantity: DataTypes.STRING,
      map_marker_logo: DataTypes.STRING,
      alert_box: DataTypes.STRING,
      enable_streetview: DataTypes.STRING,
      streetview_lat: DataTypes.FLOAT,
      streetview_long: DataTypes.FLOAT,
      streetview_yaw: DataTypes.FLOAT,
      streetview_pitch: DataTypes.FLOAT,
      streetview_zoom: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: 'ParkingSpots'
    }
  );
  return ParkingSpots;
};
