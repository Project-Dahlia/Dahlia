const sequelize = require('sequelize');
const fs = require('fs');
const Parking = require('../models/parking');

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Tables have been created');
  })
  .catch((err) => {
    console.log('Unable to create table: ', err);
  });

fs.readFile('parking-spots.json', 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading file: ', err);
    return;
  }

  const json_data = JSON.parse(data);

  // Insert each entry into the database
  json_data.Parking.forEach(async (parking) => {
    try {
      await Parking.create({
        id: parking.id,
        slug: parking.slug,
        address: parking.address,
        lat: parseFloat(parking.lat),
        lng: parseFloat(parking.lng),
        rate: parking.rate,
        parking_type: parking.parking_type,
        parking_type_str: parking.parking_type_str,
        is_ttc: parking.is_ttc,
        is_under_construction: parking.is_under_construction,
        changing_rates: parking.changing_rates,
        rate_half_hour: parseFloat(parking.rate_half_hour),
        capacity: parseInt(parking.capacity, 10),
        max_height: parseFloat(parking.max_height),
        bike_racks: parking.bike_racks,
        payment_methods: parking.payment_methods,
        payment_options: parking.payment_options,
        rate_details: parking.rate_details,
        monthly_permit_status: parking.monthly_permit_status,
        monthly_permit_quantity: parking.monthly_permit_quantity,
        monthly_permit_price: parking.monthly_permit_price,
        map_marker_logo: parking.map_marker_logo,
        alert_box: parking.alert_box,
        enable_streetview: parking.enable_streetview === 'yes',
        streetview_lat: parseFloat(parking.streetview_lat),
        streetview_long: parseFloat(parking.streetview_long),
        streetview_yaw: parseFloat(parking.streetview_yaw),
        streetview_pitch: parseFloat(parking.streetview_pitch),
        streetview_zoom: parseInt(parking.streetview_zoom, 10)
      });
    } catch (err) {
      console.error('Error inserting data: ', err);
    }
  });
});
