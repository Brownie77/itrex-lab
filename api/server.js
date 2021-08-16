require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./config');

const { queueRoutes, resolutionRoutes } = require('./src/index');
const errorHandle = require('./middleware/errHandle');

const app = express();

const PORT = process.env.SERVER_PORT || 8080;

app.use(morgan('tiny'));

app.use(
  cors({
    origin: process.env.ALLOW_CORS_FROM,
  }),
);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Appointment API',
      version: '1.0.0',
      description: 'An API to work with the queue and appointment resolutions.',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/queue/route.js', './src/resolution/route.js'],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/queue', queueRoutes);
app.use('/resolutions', resolutionRoutes);

app.use(errorHandle);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`The API server is listening on port ${PORT}...`);
});
