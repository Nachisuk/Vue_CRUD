var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var DirectorSchema = new Schema({
    imie: String,
    nazwisko: String,
    data_urodzenia: Date
})

var Director = mongoose.model("Director",DirectorSchema);
module.exports = Director;