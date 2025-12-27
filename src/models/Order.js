const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customer_name: { type: DataTypes.STRING, allowNull: false },
    customer_phone: DataTypes.STRING,
    shipping_address: DataTypes.TEXT,
    total_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
    status: { type: DataTypes.STRING, defaultValue: 'New' },
    payment_method: { type: DataTypes.STRING, defaultValue: 'Cash' },
    order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'orders', timestamps: false });

module.exports = Order;