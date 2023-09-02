'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryAssignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DeliveryAssignment.init({
    orderId: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    assignedDate: DataTypes.STRING,
    status: { type:DataTypes.ENUM('assigned','completed','canceled','pending'), defaultValue: 'pending'}
  }, {
    sequelize,
    modelName: 'DeliveryAssignment',
  });
  return DeliveryAssignment;
};