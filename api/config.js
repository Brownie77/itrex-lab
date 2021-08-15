const config = {
  inmem: {
    allow_cors_from: 'http://localhost:3000',
    PORT: 8080,
    ttl_default: 1,
    database: {
      type: 'inmemory',
    },
  },
  redis: {
    allow_cors_from: 'http://localhost:3000',
    PORT: 8080,
    ttl_default: 2,
    database: {
      type: 'redis',
    },
  },
};

const env = process.env.NODE_ENV || 'inmem';

module.exports = config[env];
