import express from 'express';
import path from 'path';

import { queueRoutes, doctorRoutes } from './routes/index.js';

import err404Handle from './middleware/notFound.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/queue', queueRoutes);
app.use('/doctor', doctorRoutes);

app.get('/', (req, res) => {
  res.redirect('/queue');
});

app.use(err404Handle);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`The frontend server is listening on port ${PORT}...`);
});
