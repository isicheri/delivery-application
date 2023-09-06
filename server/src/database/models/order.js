'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User,{
        foreignKey: "userId",
        as: "User" // Use the correct alias
      })
      Order.hasMany(models.OrderItems, 
        { foreignKey: 'orderId', 
        as: 'orderItems' // use the correct alias
       });
       Order.belongsTo(models.Driver, { foreignKey: 'driverId', as: 'driver' });
       Order.hasOne(models.DeliveryAssignment, { foreignKey: 'orderId', as: 'deliveryAssignment' });
    }
  }
  Order.init({
    orderDate: DataTypes.STRING,
   userId: {
    type: DataTypes.INTEGER
   }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};