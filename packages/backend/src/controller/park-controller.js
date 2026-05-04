'use strict';

const db = require('../models');
const ParkingSpots = db.ParkingSpots;
const Op = db.Sequelize.Op;
const { Sequelize } = db;

const DEFAULT_PAGE_LIMIT = 50;

const findAll = async (req, res) => {
  const {
    address,
    lat,
    lng,
    radius,
    carpark_type,
    page = 1,
    limit = DEFAULT_PAGE_LIMIT
  } = req.query;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(200, Math.max(1, parseInt(limit, 10) || DEFAULT_PAGE_LIMIT));
  const offset = (pageNum - 1) * limitNum;

  try {
    // Spatial radius search using PostGIS when lat/lng/radius are provided
    if (lat && lng && radius) {
      const radiusMetres = parseFloat(radius) * 1000; // convert km to metres
      let whereClause = `ST_DWithin(geog, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography, :radius)`;
      const replacements = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        radius: radiusMetres,
        limit: limitNum,
        offset
      };

      if (carpark_type) {
        whereClause += ` AND carpark_type_str ILIKE :carpark_type`;
        replacements.carpark_type = `%${carpark_type}%`;
      }

      const data = await db.sequelize.query(
        `SELECT *, ST_DistanceSphere(geog::geometry, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)) AS distance_m
         FROM "ParkingSpots"
         WHERE ${whereClause}
         ORDER BY distance_m
         LIMIT :limit OFFSET :offset`,
        { replacements, type: Sequelize.QueryTypes.SELECT }
      );

      return res.json({ data, page: pageNum, limit: limitNum });
    }

    // Address text search
    const condition = address
      ? { address: { [Op.iLike]: `%${address}%` } }
      : {};

    if (carpark_type) {
      condition.carpark_type_str = { [Op.iLike]: `%${carpark_type}%` };
    }

    const { count, rows } = await ParkingSpots.findAndCountAll({
      where: condition,
      limit: limitNum,
      offset,
      order: [['id', 'ASC']]
    });

    res.json({
      data: rows,
      total: count,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(count / limitNum)
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        'An error occurred while retrieving parking spots. Please try again later.'
    });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await ParkingSpots.findByPk(id);
    if (data) {
      res.json(data);
    } else {
      res
        .status(404)
        .json({ message: `Cannot find parking spot with id=${id}` });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Error retrieving parking spot'
    });
  }
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await ParkingSpots.destroy({ where: { id: id } });
    if (num === 1) {
      res.json({ message: 'Parking spot was deleted successfully!' });
    } else {
      res.json({
        message: `Cannot delete parking spot with id=${id}. Maybe parking spot was not found!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Could not delete parking spot with id=' + id
    });
  }
};

const updateSpot = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await ParkingSpots.update(req.body, { where: { id: id } });
    if (num[0] === 1) {
      res.json({
        message: `Parking spot with id=${id} was updated successfully!`
      });
    } else {
      res.json({
        message: `Cannot update parking spot with id=${id}. Maybe parking spot was not found!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Error updating parking spot with id=' + id
    });
  }
};

const locTtc = async (req, res) => {
  const { page = 1, limit = DEFAULT_PAGE_LIMIT } = req.query;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(200, Math.max(1, parseInt(limit, 10) || DEFAULT_PAGE_LIMIT));
  const offset = (pageNum - 1) * limitNum;

  try {
    const { count, rows } = await ParkingSpots.findAndCountAll({
      where: { is_ttc: true },
      limit: limitNum,
      offset,
      order: [['id', 'ASC']]
    });
    res.json({
      data: rows,
      total: count,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(count / limitNum)
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || 'An error occurred while retrieving parking spots.'
    });
  }
};

module.exports = {
  findAll,
  findOne,
  deleteOne,
  updateSpot,
  locTtc
};

