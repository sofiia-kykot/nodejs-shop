require('dotenv').config();
const { sequelize, Product, Order, OrderDetail } = require('./models');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Tables recreated!');

        const products = await Product.bulkCreate([
            {
                product_name: "The Body Lotion L'Emulsion",
                sku: 'BODY-001',
                description: 'Deep skin hydration with a gentle texture. Fragrance-free.',
                image_url: '/images/product-1-white.webp',
                price: 35.00,
                stock_quantity: 120,
                category_name: 'Body Care'
            },
            {
                product_name: 'Daily Gentle Cleanser',
                sku: 'FACE-001',
                description: 'Mild face wash that maintains the natural skin pH balance.',
                image_url: '/images/product-2-white.webp',
                price: 35.00,
                stock_quantity: 100,
                category_name: 'Face Care'
            },
            {
                product_name: 'Refreshing Facial Toner',
                sku: 'FACE-002',
                description: 'Toning solution with gold particles for radiant skin.',
                image_url: '/images/product-3-white.webp',
                price: 30.00,
                stock_quantity: 120,
                category_name: 'Face Care'
            },
            {
                product_name: 'Vitamin C Repair Serum',
                sku: 'FACE-003',
                description: 'Concentrated serum for skin recovery and tone alignment.',
                image_url: '/images/product-4-white.webp',
                price: 55.00,
                stock_quantity: 50,
                category_name: 'Face Care'
            },
            {
                product_name: 'Anti-Fatigue Eye Gel',
                sku: 'FACE-004',
                description: 'Cooling gel against puffiness and dark circles under eyes.',
                image_url: '/images/product-5-white.webp',
                price: 40.00,
                stock_quantity: 60,
                category_name: 'Face Care'
            },
            {
                product_name: 'Invigorating Body Wash',
                sku: 'BODY-002',
                description: 'Sandalwood scented body wash with a refreshing effect.',
                image_url: '/images/product-6-white.webp',
                price: 25.00,
                stock_quantity: 200,
                category_name: 'Body Care'
            },
            {
                product_name: 'The Gold Standard Collection',
                sku: 'SET-001',
                description: 'Complete care set: lotion, toner, cleanser, and serum.',
                image_url: '/images/product-7-white.webp',
                price: 150.00,
                stock_quantity: 20,
                category_name: 'Sets'
            },
            {
                product_name: 'Essentials Gift Box',
                sku: 'SET-002',
                description: 'Premium gift set in signature packaging. Perfect for gifting.',
                image_url: '/images/product-8-white.webp',
                price: 120.00,
                stock_quantity: 40,
                category_name: 'Sets'
            },
            {
                product_name: 'Matte Finish Face Cream',
                sku: 'FACE-005',
                description: 'Lightweight face cream with a matte finish. Oil control.',
                image_url: '/images/product-9-white.webp',
                price: 42.00,
                stock_quantity: 80,
                category_name: 'Face Care'
            },
            {
                product_name: 'Premium Beard Oil',
                sku: 'BEARD-001',
                description: 'Softening beard oil enriched with Vitamin E.',
                image_url: '/images/product-10-white.webp',
                price: 28.00,
                stock_quantity: 90,
                category_name: 'Beard Care'
            },
            {
                product_name: 'Invisible Sunscreen SPF 50',
                sku: 'FACE-006',
                description: 'Weightless sun protection that leaves no white cast.',
                image_url: '/images/product-11-white.webp',
                price: 38.00,
                stock_quantity: 110,
                category_name: 'Face Care'
            },
            {
                product_name: 'Luxury Shave Cream',
                sku: 'SHAVE-001',
                description: 'Shaving cream for sensitive skin, prevents irritation.',
                image_url: '/images/product-12-white.webp',
                price: 32.00,
                stock_quantity: 65,
                category_name: 'Beard Care'
            }
        ]);
        console.log(`Products added: ${products.length}`);
        
        const dateMinus = (days = 0, hours = 0) => {
            const d = new Date();
            d.setDate(d.getDate() - days);
            d.setHours(d.getHours() - hours);
            return d;
        };

        const orders = await Order.bulkCreate([
            {
                customer_name: 'John Smith',
                customer_phone: '+12025550109',
                shipping_address: '123 Main St, New York, NY 10001, USA',
                total_amount: 80.00,
                status: 'New',
                payment_method: 'Cash',
                order_date: new Date() 
            },
            {
                customer_name: 'Sarah Johnson',
                customer_phone: '+442079460123',
                shipping_address: '10 Downing St, London, SW1A 2AA, UK',
                total_amount: 150.00,
                status: 'Paid',
                payment_method: 'Card',
                order_date: dateMinus(1) 
            },
            {
                customer_name: 'Michael Brown',
                customer_phone: '+14165550199',
                shipping_address: '55 CN Tower Rd, Toronto, ON M5V 3L9, Canada',
                total_amount: 120.00,
                status: 'Shipped',
                payment_method: 'Card',
                order_date: dateMinus(3)
            },
            {
                customer_name: 'Emily Davis',
                customer_phone: '+61298765432',
                shipping_address: '42 Wallaby Way, Sydney, NSW 2000, Australia',
                total_amount: 55.00,
                status: 'Completed',
                payment_method: 'Card',
                order_date: dateMinus(7)
            },
            {
                customer_name: 'David Wilson',
                customer_phone: '+13105550155',
                shipping_address: '8008 Sunset Blvd, Los Angeles, CA 90046, USA',
                total_amount: 225.00,
                status: 'New',
                payment_method: 'Cash',
                order_date: new Date()
            },
            {
                customer_name: 'Jessica Taylor',
                customer_phone: '+12125550188',
                shipping_address: '350 Fifth Ave, New York, NY 10118, USA',
                total_amount: 78.00,
                status: 'Paid',
                payment_method: 'Card',
                order_date: dateMinus(2)
            },
            {
                customer_name: 'Daniel Anderson',
                customer_phone: '+442071234567',
                shipping_address: '221B Baker St, London, NW1 6XE, UK',
                total_amount: 60.00,
                status: 'Shipped',
                payment_method: 'Cash',
                order_date: dateMinus(5)
            },
            {
                customer_name: 'Laura Thomas',
                customer_phone: '+13055550144',
                shipping_address: '1 Ocean Dr, Miami, FL 33139, USA',
                total_amount: 42.00,
                status: 'New',
                payment_method: 'Card',
                order_date: dateMinus(0, 4) 
            },
            {
                customer_name: 'Robert Jackson',
                customer_phone: '+17025550122',
                shipping_address: '3600 S Las Vegas Blvd, Las Vegas, NV 89109, USA',
                total_amount: 50.00,
                status: 'Completed',
                payment_method: 'Card',
                order_date: dateMinus(10)
            },
            {
                customer_name: 'Sophia White',
                customer_phone: '+33144556677',
                shipping_address: '5 Avenue Anatole France, 75007 Paris, France',
                total_amount: 65.00,
                status: 'Paid',
                payment_method: 'Cash',
                order_date: dateMinus(0, 6) 
            }
        ]);
        console.log(`Orders added: ${orders.length}`);
        
        await OrderDetail.bulkCreate([
            { order_id: 1, product_id: 1, quantity: 1, unit_price: 35.00 },
            { order_id: 1, product_id: 2, quantity: 1, unit_price: 35.00 }, 

            { order_id: 2, product_id: 7, quantity: 1, unit_price: 150.00 }, 

            { order_id: 3, product_id: 8, quantity: 1, unit_price: 120.00 }, 

            { order_id: 4, product_id: 4, quantity: 1, unit_price: 55.00 },

            { order_id: 5, product_id: 7, quantity: 1, unit_price: 150.00 }, 
            { order_id: 5, product_id: 3, quantity: 1, unit_price: 30.00 },  
            { order_id: 5, product_id: 1, quantity: 1, unit_price: 35.00 },  

            { order_id: 6, product_id: 5, quantity: 1, unit_price: 40.00 },  
            { order_id: 6, product_id: 11, quantity: 1, unit_price: 38.00 }, 

            { order_id: 7, product_id: 12, quantity: 1, unit_price: 32.00 },
            { order_id: 7, product_id: 10, quantity: 1, unit_price: 28.00 }, 

            { order_id: 8, product_id: 9, quantity: 1, unit_price: 42.00 }, 

            { order_id: 9, product_id: 6, quantity: 2, unit_price: 25.00 },

            { order_id: 10, product_id: 2, quantity: 1, unit_price: 35.00 },
            { order_id: 10, product_id: 3, quantity: 1, unit_price: 30.00 }  
        ]);
        console.log('Order details added.');

    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await sequelize.close();
    }
};

seedDatabase();