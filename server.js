const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

// adding helper function
const helpers = require('./utils/helpers');

// sequelize
const session = require('express-session');

// handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);


// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(routes)

// access db and server with sequelize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});


