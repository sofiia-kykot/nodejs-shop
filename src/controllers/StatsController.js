const { Order, OrderDetail, Product, sequelize } = require('../models/index');
const { Op } = require('sequelize');

class StatsController {
    async getSalesPeriod(req, res) {
        try {
            res.render('pages/stats-sales', {
                title: 'Product sales report',
                data: null,
                dates: null
            });
        } catch (error) {
            console.error("Controller Error:", error);
            res.status(500).send("Error loading page.");
        }
    }

    async calculateSalesPeriod(req, res) {
        try {
            let { startDate, endDate } = req.body;

            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59, 999);

            const query = `
                SELECT 
                    p.product_name, 
                    p.sku, 
                    COALESCE(SUM(od.quantity), 0) as sold_qty, 
                    COALESCE(SUM(od.quantity * od.unit_price), 0) as total_revenue
                FROM order_details od
                JOIN products p ON od.product_id = p.product_id
                JOIN orders o ON od.order_id = o.order_id
                WHERE o.order_date BETWEEN :startDate AND :endDate
                GROUP BY p.product_id, p.product_name, p.sku
                ORDER BY total_revenue DESC
            `;

            const stats = await sequelize.query(query, {
                replacements: { startDate, endDate: endOfDay },
                type: sequelize.QueryTypes.SELECT
            });

            res.render('pages/stats-sales', {
                title: 'Product sales report',
                data: stats,
                dates: { startDate, endDate }
            });

        } catch (error) {
            console.error("Calculation Error:", error);
            res.status(500).send("Error calculating stats: " + error.message);
        }
    }

    async getCategories(req, res) {
        try {
            const query = `
                SELECT 
                    p.category_name,
                    COUNT(DISTINCT p.product_id) as product_count,
                    COALESCE(SUM(od.quantity), 0) as sold_qty,
                    COALESCE(SUM(od.quantity * od.unit_price), 0) as total_revenue
                FROM products p
                LEFT JOIN order_details od ON p.product_id = od.product_id
                LEFT JOIN orders o ON od.order_id = o.order_id
                WHERE o.status != 'Canceled' OR o.status IS NULL
                GROUP BY p.category_name
                HAVING total_revenue > 0
                ORDER BY total_revenue DESC
            `;

            const stats = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT
            });

            res.render('pages/stats-categories', {
                title: 'Revenue by Category',
                data: stats
            });

        } catch (error) {
            console.error("Controller Error:", error);
            res.status(500).send("Error loading category stats.");
        }
    }

}

module.exports = new StatsController();