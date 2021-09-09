const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const {
  queueRoutes,
  resolutionRoutes,
  authRoutes,
  doctorRoutes
} = require('./src/exportRoutes');
const errorHandle = require('./middleware/errHandle');

const app = express();

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
        url: `http://localhost:${process.env.SERVER_PORT}`,
      },
    ],
  },
  apis: ['./src/queue/route.js', './src/resolution/route.js'],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use(morgan('tiny'));

app.use(
  cors({
    credentials: true,
    origin: process.env.ALLOW_CORS_FROM,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/queue', queueRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patients', resolutionRoutes);
app.use('/api/v1/doctor', doctorRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandle);

// await testbase.add('Valentino');
module.exports = app;
