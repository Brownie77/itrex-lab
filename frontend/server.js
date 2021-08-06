import express from 'express';
import path from 'path';

import queueRoutes from './routes/client.js';
import doctorRoutes from './routes/doctor.js';

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

app.listen(PORT);
console.log(`The frontend server is listening on port ${PORT}...`);
