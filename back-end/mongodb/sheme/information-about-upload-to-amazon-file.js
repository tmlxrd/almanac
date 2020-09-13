const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model("tests", new Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  from: String,
  filename: String,
  pathInAmazon: String,
  size: Number,
  upload:Number,
  code:String,
  dateInfo:{
    hour:Number,
    day:Number,
    dayForDelete:Number,
    month:Number,
    monthForDelete:Number,
    oneDownload:Boolean,
    maxData:Number
  },
  download:Boolean,
  numberDownload:{ type: Number, default: 0 }
}));