const db = require('../models');
const ParkingSpots = db.ParkingSpots;
const Op = db.Sequelize.Op;

//Retrieve all ParkingSpots from the database by address
exports.findAll = (req, res) => {
  const address = req.query.address;
  let condition = address ? { address: { [Op.iLike]: `%${address}` } } : null;

  ParkingSpots.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'An error occurred while retrieving parking spots. please try again later.'
      });
    });
};

//Find a single parking spot
exports.findOne = (req, res) => {
  const id = req.params.id;

  ParkingSpots.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find parking spot with id=${id}`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving parking spot'
      });
    });
};

//Update a current parking spots by id
exports.update = (req, res) => {
  const id = req.params.id;

  ParkingSpots.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'parking spot was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete parking spot with id=${id}. Maybe parking spot was not found!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Could not delete parking spot with id=' + id
      });
    });
};

// Locate all TTC parking
exports.findAllTtc = (req, res) => {
  ParkingSpots.findAll({ where: { is_ttc: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while retrieving parking spots.'
      });
    });
};
