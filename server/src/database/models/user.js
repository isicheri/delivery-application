'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order,{
        foreignKey: "userId",
        as: "Orders" // Use the correct alias
      })
    }
  }
  User.init({
    firstName: {type:DataTypes.STRING,allowNull:false},
    lastName: {type:DataTypes.STRING,allowNull:false},
    email: {type:DataTypes.STRING,allowNull:false,unique: true},
    password: {type:DataTypes.STRING,allowNull:false},
    phone: {type:DataTypes.STRING,allowNull:false},
    isVerified: {type: DataTypes.BOOLEAN,defaultValue: false},
    userType: {type:DataTypes.ENUM("user","admin","super-admin"),defaultValue: "users"},
    status: {type: DataTypes.ENUM("active","blocked","inactive"),defaultValue: "inactive"}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};