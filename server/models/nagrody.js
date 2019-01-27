var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var AwardSchema = new Schema({
    nazwa: String,
    opis: String,
    obrazek: String
})

var Award = mongoose.model("Award",AwardSchema);
module.exports = Award;