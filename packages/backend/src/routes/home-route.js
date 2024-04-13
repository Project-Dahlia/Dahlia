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

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: Test route
 */

/**
 * @swagger
 * /api/v1/test:
 *   post:
 *     summary: Create a new test
 *     description: Create a new test with the provided first name and last name.
 *     tags: [Test]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Test created successfully!"
 *       "400":
 *         description: Bad Request
 *       "401":
 *         description: Unauthorized
 *       "500":
 *         description: Server Error
 */

router.post('/test', homeController.test);

module.exports = router;
