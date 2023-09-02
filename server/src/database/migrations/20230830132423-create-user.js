'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull:false
        },
      lastName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
       allowNull:false,
       unique: true
      },
      password: {
      type: Sequelize.STRING,
      allowNull:false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull:false
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    userType: {type:Sequelize.ENUM("user","admin","super-admin"),
    defaultValue: "user"
    },
    status: {
      type: Sequelize.ENUM("active","blocked","inactive"),
      defaultValue: "inactive"
  },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};