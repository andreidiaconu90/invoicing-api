const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const routes = require("./routes/index.js");
const app = express();

app.use("/", routes);
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

module.exports = app;
