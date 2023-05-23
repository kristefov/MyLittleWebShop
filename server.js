const express = require("express");
const path = require("path");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");
const routes = require("./controllers");
const compression = require('compression');
const favicon = require('serve-favicon')
// the two below are for future handling of added domain name
//const vhost = require('vhost');
//const http = require('http')
// const helpers = require("./util/helpers");
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });
const sess = {
  secret: "Super secret secret",
  cookie: {maxAge: 30000},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
// compress responses
app.use(compression())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(vhost('www.example.com', app))
// app.use(vhost('example.com', app))
 
app.use(session(sess));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening to http://127.0.0.1:" + PORT));
});
