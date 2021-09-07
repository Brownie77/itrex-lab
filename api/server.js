require('dotenv').config();

const app = require('./initExpress');

const PORT = process.env.SERVER_PORT;

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`The API server is listening on port ${PORT}...`);
});
