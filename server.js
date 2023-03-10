const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});
const app = express();

const PORT = process.env.PORT || 3001;

// adding helper function
const helpers = require('./utils/helpers');

// sequelize
const session = require('express-session');

// handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {maxAge: 10000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };


// middleware 
app.use(express.json());
app.use(session(sess));
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes)

// access db and server with sequelize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});


