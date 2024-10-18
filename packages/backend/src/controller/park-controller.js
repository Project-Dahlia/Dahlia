const db = require('../models');
const ParkingSpots = db.ParkingSpots;
const Op = db.Sequelize.Op;

const findAll = async (req, res) => {
  const address = req.query.address;
  const condition = address
    ? { address: { [Op.iLike]: `%${address}%` } }
    : null;

  try {
    const data = await ParkingSpots.findAll({ where: condition || {} });
    res.send(data);
  } catch (err) {
    res.status(500).send({
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
      res.send(data);
    } else {
      res
        .status(404)
        .send({ message: `Cannot find parking spot with id=${id}` });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error retrieving parking spot'
    });
  }
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await ParkingSpots.destroy({ where: { id: id } });
    if (num === 1) {
      res.send({ message: 'Parking spot was deleted successfully!' });
    } else {
      res.send({
        message: `Cannot delete parking spot with id=${id}. Maybe parking spot was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Could not delete parking spot with id=' + id
    });
  }
};

const updateSpot = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await ParkingSpots.update(req.body, { where: { id: id } });
    if (num[0] === 1) {
      res.send({
        message: `Parking spot with id=${id} was updated successfully!`
      });
    } else {
      res.send({
        message: `Cannot update parking spot with id=${id}. Maybe parking spot was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error updating parking spot with id=' + id
    });
  }
};

const locTtc = async (req, res) => {
  try {
    const data = await ParkingSpots.findAll({ where: { is_ttc: true } });
    res.send(data);
  } catch (err) {
    res.status(500).send({
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
