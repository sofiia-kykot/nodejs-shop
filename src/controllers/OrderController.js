const {Order, OrderDetail, Product, sequelize} = require('../models/index');

class OrderController {

    async index(req, res) {
        try {
            const orders = await Order.findAll({
                order: [['order_id', 'asc']]
            });

            res.render('pages/orders', {
                orders,
                title: 'Manage Orders'
            });
        } catch (error) {
            console.error("Controller Error:", error);
            res.status(500).send("Error retrieving orders from database.");
        }
    }

    async create(req, res) {
        try {
            const products = await Product.findAll();
            res.render('pages/order-create', {
                products,
                title: 'New Order'
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async store(req, res) {
        const t = await sequelize.transaction();

        try {
            const {customer_name, customer_phone, shipping_address, status, payment_method, products} = req.body;

            let calculatedTotal = 0;
            const orderItemsData = [];

            const productList = Array.isArray(products) ? products : [products];

            for (const item of productList) {
                const product = await Product.findByPk(item.product_id);

                if (!product) {
                    throw new Error(`Product with ID ${item.product_id} not found`);
                }

                const quantity = parseInt(item.quantity);
                const price = parseFloat(product.price);

                calculatedTotal += price * quantity;

                orderItemsData.push({
                    product_id: product.product_id,
                    quantity: quantity,
                    unit_price: price
                });
            }

            const newOrder = await Order.create({
                customer_name,
                customer_phone,
                shipping_address,
                status,
                payment_method,
                total_amount: calculatedTotal,
                order_date: new Date()
            }, {transaction: t});

            const detailsWithOrderId = orderItemsData.map(item => ({
                ...item,
                order_id: newOrder.order_id
            }));

            await OrderDetail.bulkCreate(detailsWithOrderId, {transaction: t});

            await t.commit();

            res.redirect('/');

        } catch (error) {
            await t.rollback();
            console.error('Error creating order:', error);
            res.status(500).send("Error creating order: " + error.message);
        }
    };

    async show(req, res) {
        try {
            const order = await Order.findByPk(req.params.id, {
                include: [{
                    model: OrderDetail,
                    as: 'items',
                    include: [Product]
                }]
            });

            if (!order) return res.status(404).send('Order not found');

            res.render('pages/order-details', {
                order,
                title: `Order Details #${order.order_id}`
            });

        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = new OrderController();