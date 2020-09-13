const mongoose = require("mongoose");
require('dotenv').config()

module.exports = mongoose
  .connect(process.env.mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

