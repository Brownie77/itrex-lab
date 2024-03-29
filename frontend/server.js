import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { queueRoutes, doctorRoutes, authRoutes } from './routes/index.js';

import err404Handle from './middleware/notFound.js';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/auth', authRoutes);
app.use('/cabinet', queueRoutes);
app.use('/doctor', doctorRoutes);

app.get('/', (req, res) => {
  res.redirect('/auth/sign-in');
});

app.use(err404Handle);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`The frontend server is listening on port ${PORT}...`);
});
