import express from 'express';
import router from './api/v1/routes/index';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import config from 'config';
import { login, verifyAuth, loginLimit } from './login/index';

// init configs
const port = config.get('PORT') || 3001;

// init swagger configs
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Currency Converter API',
      version: '1.0.0',
      description: 'REST API used by the Currency Converter tool',
      contact: {
        name: 'Lochana Ranaweera',
      },
      servers: ['http://localhost:3001'],
    },
  },
  apis: ['index.js', './api/v1/routes/index.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
app.use('/login', loginLimit);

/**
 * @swagger
 * /login:
 *  get:
 *    description: Used to obtain JWT required to login
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: string
 *          example: "eyJhbGciOiJIUzI1NiJ9.bG9nZ2VkX2l69MJAI-41pu1VffYFl9PX4raikMAo20J3Ex2k"
 *      '429':
 *        description: Error response
 *        schema:
 *          type: string
 *          example: "Too many requests, please try again later."
 */
app.use('/login', login);
app.use(verifyAuth);
app.use('/api/v1/', router);
app.use((err, _req, res, next) => {
  if (err.status === 401) {
    res.status(401).json(err);
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`Currency Converter BFF listening on port ${port}!`));
