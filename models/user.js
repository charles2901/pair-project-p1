'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model{

  }

  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Username cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Password cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:{
          msg : 'Wrong email format'
        }
      }
    }
  }, {sequelize});

  User.beforeCreate((instance, options) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(instance.password, salt)
    instance.password = hash
  })

  User.associate = function(models) {
    User.belongsToMany(models.Item, {through: models.Cart})
  };
  return User;
};