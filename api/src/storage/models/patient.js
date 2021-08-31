const Sequelize = require('sequelize');

const Patient = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  birthdate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
};

module.exports = Patient;
