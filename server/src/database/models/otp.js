'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Otp.belongsTo(models.User,{
        foreignKey: "userId",
        as: "User"
      })
    }
  }
  Otp.init({
    otp: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    expiresAt:{
       type: DataTypes.STRING,
       defaultValue: ''
    }
  }, {
    sequelize,
    modelName: 'Otp',
  });
  return Otp;
};