'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Cart extends Model{}
  Cart.init({
    UserId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, { sequelize });
  Cart.associate = function(models) {
    // associations can be defined here
  };
  return Cart;
};