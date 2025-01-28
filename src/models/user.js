'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const {SALT} = require('../config/serverConfig.js');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type:Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type:Sequelize.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });

   User.beforeCreate((user)=>{
    console.log(user);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
   });

  return User;
};