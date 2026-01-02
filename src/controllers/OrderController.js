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
            res.render('pages/order-form', {
                products,
                orderItems: [],
                title: 'New Order',
                formType: 'create'
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async store(req, res) {
        const t = await sequelize.transaction();

        try {
            const {
                customer_name,
                customer_phone,
                shipping_address,
                status,
                payment_method,
                items
            } = req.body;

            let calculatedTotal = 0;
            const orderItemsData = [];

            if (!items || items.length === 0) {
                throw new Error('No items in the order');
            }

            for (const item of items) {
                const product = await Product.findByPk(item.product_id, {transaction: t});

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

            res.status(201).json({
                success: true,
                message: 'Order created successfully',
                order_id: newOrder.id
            });

        } catch (error) {
            await t.rollback();
            console.error('Error creating order:', error);

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

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

    async edit(req, res) {
        try {
            const order = await Order.findByPk(req.params.id, {
                include: [{
                    model: OrderDetail,
                    as: 'items',
                    include: [Product]
                }]
            });
            const products = await Product.findAll();

            if (!order) return res.status(404).send('Order not found');

            console.log(JSON.stringify(order.items, null, 2));

            res.render('pages/order-form', {
                order,
                orderItems: order.items,
                products,
                title: `Edit order #${order.order_id}`,
                formType: 'edit'
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async update(req, res) {
        const t = await sequelize.transaction();

        try {
            const orderId = req.params.id;

            const {
                customer_name,
                customer_phone,
                shipping_address,
                status,
                payment_method,
                items
            } = req.body;

            const order = await Order.findByPk(orderId, {transaction: t});

            if (!order) {
                throw new Error(`Order with ID ${orderId} not found`);
            }

            if (!items || items.length === 0) {
                throw new Error('Order must contain at least one item');
            }

            let newTotal = 0;
            const newOrderItemsData = [];

            for (const item of items) {
                const product = await Product.findByPk(item.product_id, {transaction: t});

                if (!product) {
                    throw new Error(`Product ID ${item.product_id} not found`);
                }

                const quantity = parseInt(item.quantity);
                const price = parseFloat(product.price);

                newTotal += price * quantity;

                newOrderItemsData.push({
                    order_id: orderId,
                    product_id: product.product_id,
                    quantity: quantity,
                    unit_price: price
                });
            }

            await order.update({
                customer_name,
                customer_phone,
                shipping_address,
                status,
                payment_method,
                total_amount: newTotal
            }, {transaction: t});

            await OrderDetail.destroy({
                where: {order_id: orderId},
                transaction: t
            });

            await OrderDetail.bulkCreate(newOrderItemsData, {transaction: t});

            await t.commit();

            res.status(200).json({
                success: true,
                message: 'Order updated successfully'
            });

        } catch (error) {
            await t.rollback();
            console.error('Error updating order:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            await order.destroy();
            res.status(200).send('Order deleted successfully');
        } catch (error) {
            res.status(500).send(error.message);
        }

    }
}

module.exports = new OrderController();