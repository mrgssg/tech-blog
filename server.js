const express = require('express');
const routes = require('.routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(routes)

// access db and server with sequelize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});


