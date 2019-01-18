var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var GenreSchema = new Schema({
    nazwa: String,
    opis: String,
})

var Genre = mongoose.model("Genre",GenreSchema);
module.exports = Genre;