import express from 'express';
import getCountry from '../controller';

const router = express.Router();

/**
 * @swagger
 * /api/v1/countries/{country_name}?token:
 *  get:
 *    description: Used to obtain country information
 *    produces:
 *      - application/json
 *    parameters:
 *    - in: path
 *      name: country_name
 *      required: true
 *      type: string
 *    - in: query
 *      name: token
 *      required: true
 *      type: string
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          $ref: '#/definitions/Countries'
 *      '404':
 *        description: Not Found
 *        schema:
 *          $ref: '#/definitions/CountryNotFound'
 *
 * definitions:
 *  Countries:
 *      type: array
 *      items:
 *          type: Country
 *  Country:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              example: 'Sri Lanka'
 *          topLevelDomain:
 *              type: array
 *          alpha2Code:
 *              type: string
 *              example: 'LK'
 *          alpha3Code:
 *              type: string
 *              example: 'LKA'
 *          capital:
 *              type: string
 *              example: 'Colombo'
 *          population:
 *              type: number
 *              example: 20966000
 *          currenciesWithRates:
 *              type: array
 *              items:
 *                  type: CurrencyObj
 *  CurrencyObj:
 *      type: object
 *      properties:
 *          code:
 *              type: string
 *              example: 'LKR'
 *          rate:
 *              type: number
 *              example: 19.2051642
 *
 *  CountryNotFound:
 *      type: object
 *      properties:
 *          status:
 *              type: number
 *              example: 404
 *          message:
 *              type: string
 *              example: 'Country with name matching not found'
 *
 */
router.get('/countries/:name', getCountry);

export default router;
