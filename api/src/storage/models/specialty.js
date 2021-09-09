const Sequelize = require('sequelize');

const Specialty = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
};

module.exports = Specialty;
