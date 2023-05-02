const mongoConfig = require("../config/mongodb.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = mongoConfig.url;
db.users = require("./users.model.js")(mongoose);
db.ebooks = require("./ebook.model.js")(mongoose);

module.exports = db;
