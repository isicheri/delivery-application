'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Driver.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    vehicleplateNumber: DataTypes.STRING,
    vehiclecType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};