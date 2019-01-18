var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ContentSchema = new Schema({
    nazwa: String,
    opis: String,
})

var Content = mongoose.model("Content",ContentSchema);
module.exports = Content;