var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var MovieSchema = new Schema({
    nazwa: String,
    opis: String,
    kategoria_wiekowa: String,
    reżyser: String,
    gatunek: String,
    nagrody: String,
    data_wydania: Date
})

var Movie = mongoose.model("Movie",MovieSchema);
module.exports = Movie;