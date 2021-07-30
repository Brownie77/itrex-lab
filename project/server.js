const express = require('express');
const path = require('path');
const morgan = require('morgan');

const queueRoutes = require('./routes/client');
const doctorRoutes = require('./routes/doctor');

const err404Handle = require('./middleware/notFound');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/queue', queueRoutes);
app.use('/doctor', doctorRoutes);

app.get('/', (req, res) => {
  res.redirect('/queue');
});

app.use(err404Handle);

app.listen(PORT);
console.log(`Listening on port ${PORT}...`);
