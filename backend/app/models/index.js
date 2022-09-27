const dbConfig = require("../config/database.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.product = require("./product.model.js")(mongoose);
db.category = require("./category.model.js")(mongoose);

module.exports = db;