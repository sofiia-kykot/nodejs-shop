const sequelize = require('../config/database');
const Order = require('./Order');
const Product = require('./Product');
const OrderDetail = require('./OrderDetail');

// Relationships
Order.hasMany(OrderDetail, {foreignKey: 'order_id', as: 'items'});
OrderDetail.belongsTo(Order, {foreignKey: 'order_id'});

Product.hasMany(OrderDetail, {foreignKey: 'product_id'});
OrderDetail.belongsTo(Product, {foreignKey: 'product_id'});

module.exports = {
    sequelize,
    Order,
    Product,
    OrderDetail
};