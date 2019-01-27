var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var MovieSchema = new Schema({
    nazwa: String,
    opis: String,
    plakat: String,
    kategoria_wiekowa: {type: Schema.Types.ObjectId, ref:'Content'},
    reżyser: {type: Schema.Types.ObjectId, ref:'Director'},
    gatunek: [{type: Schema.Types.ObjectId, ref:'Genre'}],
    nagrody: [{type: Schema.Types.ObjectId, ref:'Award'}],
    data_wydania: Date
    
})

var Movie = mongoose.model("Movie",MovieSchema);
module.exports = Movie; 