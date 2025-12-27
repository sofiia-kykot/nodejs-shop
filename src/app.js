const express = require('express');
const path = require('path');
require('dotenv').config();

const db = require('./models/index');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', orderRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.authenticate()
    .then(() => {
        console.log('MySQL connection established successfully.');

        return db.sequelize.sync({ force: false });
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });