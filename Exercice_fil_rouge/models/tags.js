const sequelize = require('../core/orm.js');
const { DataTypes } = require('sequelize');

const Tags = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
}, {
  timestamps: true
});

module.exports = Tags;
