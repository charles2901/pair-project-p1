'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Item extends Model{}
  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    path: DataTypes.STRING
  }, { sequelize });
  Item.associate = function(models) {
    Item.belongsToMany(models.User, {through: models.Cart})
  };
  return Item;
};