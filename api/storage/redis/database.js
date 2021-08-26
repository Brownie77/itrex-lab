const redis = require('redis');

const PORT = process.env.REDIS_PORT;
const HOST = process.env.REDIS_HOST;

module.exports = new (class Database {
  constructor() {
    this.DBtype = 'redis';
    this.client = redis.createClient(
      process.env.REDIS_URL || { port: PORT, host: HOST },
    );
    this.client.on('connect', () => {
      console.log(
        `Connected to redis server on ${
          process.env.REDIS_URL || `localhost:${PORT}`
        }`,
      );
    });
    this.client.on('error', (error) => {
      console.log(error);
      console.log(
        `A critical error occured while connecting to redis server on ${
          process.env.REDIS_URL || `localhost:${PORT}`
        }, the server is shutting down...`,
      );
      process.exit(1);
    });
  }
})();
