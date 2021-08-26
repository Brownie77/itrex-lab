const Sequelize = require('sequelize');

const Resolution = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  resolution: {
    type: Sequelize.STRING,
  },
  ttl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

module.exports = Resolution;
