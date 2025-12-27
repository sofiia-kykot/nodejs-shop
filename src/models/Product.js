const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_name: { type: DataTypes.STRING, allowNull: false },
    sku: { type: DataTypes.STRING, unique: true },
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    category_name: DataTypes.STRING
}, { tableName: 'products', timestamps: false });

module.exports = Product;