const { promisify } = require('util');
const redis = require('redis');
const {
  DatabaseFailedToConnectError,
} = require('../../errors/customDatabaseErrs');

const PORT = process.env.REDIS_PORT;
const HOST = process.env.REDIS_HOST;

module.exports = new (class Database {
  constructor() {
    this.type = 'redis';
    this.db = redis.createClient(
      process.env.REDIS_URL || { port: PORT, host: HOST },
    );
    this.db.on('connect', () => {
      console.log(
        `Connected to redis server on ${
          process.env.REDIS_URL || `localhost:${PORT}`
        }`,
      );
    });
    this.db.on('error', (error) => {
      throw new DatabaseFailedToConnectError(
        `A critical error occured while connecting to redis server on ${
          process.env.REDIS_URL || `localhost:${PORT}`
        }`,
        error,
      );
    });
    this.db.scan = promisify(this.db.scan);
  }

  scanAll = async (pattern) => {
    const found = [];
    let cursor = '0';

    do {
      const reply = await this.db.scan(cursor, 'MATCH', pattern);

      [cursor] = reply;
      found.push(...reply[1]);
    } while (cursor !== '0');

    return found;
  };
})();
