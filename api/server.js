const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const { queueRoutes, resolutionRoutes } = require('./src/index');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }),
);

const options = {
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
  apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/queue', queueRoutes);
app.use('/resolutions', resolutionRoutes);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`The API server is listening on port ${PORT}...`);
});
