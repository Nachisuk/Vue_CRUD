var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var GenreSchema = new Schema({
    nazwa: String,
    opis: String,
    filmy: [{type: Schema.Types.ObjectId, ref:'Movie'}]
})

var Genre = mongoose.model("Genre",GenreSchema);
module.exports = Genre;