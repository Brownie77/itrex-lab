const redis = require('redis');

const port = process.env.DATABASE_PORT;
const host = process.env.DATABASE_HOST;

module.exports = class Database {
  constructor() {
    this.client = process.env.REDIS_URL
      ? redis.createClient(process.env.REDIS_URL)
      : redis.createClient(port, host);
    this.client.on('connect', () => {
      console.log(
        `Connected to redis server on ${
          process.env.REDIS_URL || `${host}:${port}`
        }`,
      );
    });
    this.client.on('error', (error) => {
      console.log(error);
      console.log(
        `A critical error occured while connecting to redis server on ${
          process.env.REDIS_URL || `${host}:${port}`
        }, the server is shutting down...`,
      );
      process.exit(1);
    });
  }
};
