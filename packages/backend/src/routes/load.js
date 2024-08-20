const express = require('express');
const { User } = require('../models');
const fs = require('fs');
const router = express.Router();

router.post('load-json', async (req, res) => {
  try {
    const data = JSON.parse(
      fs.readFileSync('../data/toronto-parking-2019', 'utf8')
    );
    await User.bulkCreate(data);
    res.status(200).send('Data loaded successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
