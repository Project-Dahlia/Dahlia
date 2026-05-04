const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Health check
 *     description: Returns service health and database connectivity status.
 *     tags: [Health]
 *     responses:
 *       "200":
 *         description: Healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 db:
 *                   type: string
 *                   example: connected
 *       "503":
 *         description: Unhealthy
 */
router.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'error', db: 'disconnected', error: err.message });
  }
});

module.exports = router;
