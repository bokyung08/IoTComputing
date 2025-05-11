const express = require('express');
const router = express.Router();
const { sensorData } = require('../serial');

router.get('/state', (req, res) => {
  res.json(sensorData);
});

module.exports = router;
