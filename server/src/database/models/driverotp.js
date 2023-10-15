'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DriverOtp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DriverOtp.belongsTo(models.Driver,{foreignKey: 'driverId',as: 'driver'})
    }
  }
  DriverOtp.init({
    otp: DataTypes.STRING,
    driverId: DataTypes.INTEGER,
    expiresAt: { type:DataTypes.STRING, defaultValue: ''}
  }, {
    sequelize,
    modelName: 'DriverOtp',
  });
  return DriverOtp;
};