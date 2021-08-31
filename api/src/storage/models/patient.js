const Sequelize = require('sequelize');

const Patient = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    allowNull: false,
  },
  identifier: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

module.exports = Patient;
