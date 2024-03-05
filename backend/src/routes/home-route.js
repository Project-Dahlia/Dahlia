const express = require('express');
const router = express.Router();
const homeController = require('../controller/home-controller');

/**
 * @swagger
 * tags:
 *  name: Home
 *  description: Home route
 */

/**
 * @swagger
 * /api/v1:
 *   get:
 *     summary: Home route
 *     description: Home route of the API.
 *     tags: [Home]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *                schema:
 *                 type: array
 *                items:
 *                 type: object
 *                properties:
 *                message:
 *                 type: string
 *                example: "Home route!"
 *
 *     400:
 *        description: Bad Request
 *     401:
 *        description: Unauthorized
 *     404:
 *        description: Not Found
 *     500:
 *        description: Server Error
 */

router.get('/', homeController.home);

module.exports = router;
