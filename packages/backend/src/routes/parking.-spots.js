const express = require('express');
const router = express.Router();
const parkingController = require('../controller/park-controller');

/**
 * @swagger
 * tags:
 *   name: Parking Spots
 *   description: Operations related to parking spots
 */

/**
 * @swagger
 * /api/v1/parking-spots:
 *   get:
 *     summary: Retrieve all parking spots
 *     description: Retrieve a list of all parking spots, optionally filtered by address.
 *     tags: [Parking Spots]
 *     parameters:
 *       - in: query
 *         name: address
 *         required: false
 *         description: Address to filter parking spots
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: A list of parking spots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the parking spot
 *                   address:
 *                     type: string
 *                     description: The address of the parking spot
 *                   is_ttc:
 *                     type: boolean
 *                     description: Indicates if the parking spot is TTC
 *       "500":
 *         description: Server Error
 */
router.get('/parking-spots', parkingController.findAll);
/**
 * @swagger
 * /api/v1/parking-spots/{id}:
 *   get:
 *     summary: Retrieve a single parking spot
 *     description: Retrieve a parking spot by its ID.
 *     tags: [Parking Spots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the parking spot
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: The parking spot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 address:
 *                   type: string
 *                 is_ttc:
 *                   type: boolean
 *       "404":
 *         description: Parking spot not found
 *       "500":
 *         description: Server Error
 */

router.get('/parking-spots/:id', parkingController.findOne);
/**
 * @swagger
 * /api/v1/parking-spots/{id}:
 *   put:
 *     summary: Update a parking spot
 *     description: Update a parking spot by its ID.
 *     tags: [Parking Spots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the parking spot
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               is_ttc:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: Successfully updated the parking spot
 *       "400":
 *         description: Bad Request
 *       "404":
 *         description: Parking spot not found
 *       "500":
 *         description: Server Error
 */
router.put('/parking-spots/:id', parkingController.updateSpot);

/**
 * @swagger
 * /api/v1/parking-spots/{id}:
 *   delete:
 *     summary: Delete a parking spot
 *     description: Delete a parking spot by its ID.
 *     tags: [Parking Spots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the parking spot
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: Successfully deleted the parking spot
 *       "404":
 *         description: Parking spot not found
 *       "500":
 *         description: Server Error
 */
router.delete('/parking-spots/:id', parkingController.deleteOne);

/**
 * @swagger
 * /api/v1/parking-spots/ttc:
 *   get:
 *     summary: Retrieve all TTC parking spots
 *     description: Retrieve a list of parking spots that are TTC.
 *     tags: [Parking Spots]
 *     responses:
 *       "200":
 *         description: A list of TTC parking spots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   address:
 *                     type: string
 *                   is_ttc:
 *                     type: boolean
 *       "500":
 *         description: Server Error
 */
router.get('/parking-spots/ttc', parkingController.locTtc);
/**
 * @swagger
 * /api/v1/parking-spots/ttc:
 *   get:
 *     summary: Retrieve all TTC parking spots
 *     description: Retrieve a list of parking spots that are designated as TTC.
 *     tags: [Parking Spots]
 *     responses:
 *       "200":
 *         description: A list of TTC parking spots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the parking spot
 *                   address:
 *                     type: string
 *                     description: The address of the parking spot
 *                   is_ttc:
 *                     type: boolean
 *                     description: Indicates if the parking spot is TTC (true) or not (false)
 *             example:
 *               - id: 1
 *                 address: "123 Main St"
 *                 is_ttc: true
 *               - id: 2
 *                 address: "456 Maple Ave"
 *                 is_ttc: true
 *       "500":
 *         description: Server Error
 */

module.exports = router;
