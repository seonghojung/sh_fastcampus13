module.exports = function (sequelize, DataTypes) {
  const Cart = sequelize.define(
    "Cart",
    {
      id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
      product_id: { type: DataTypes.STRING },
      number: { type: DataTypes.STRING },
      amount: { type: DataTypes.STRING },
      thumbnail: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING }
    },
    {
      tableName: "Cart"
    }
  );

  return Cart;
};
