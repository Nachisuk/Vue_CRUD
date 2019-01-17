const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",function(callback){
  console.log("Connection succeded");
})

var Movie = require("../models/movie");

//Dostanie wszystkich filmów
app.get('/movies', (req, res) => {
   Movie.find({},'nazwa opis kategoria_wiekowa gatunek nagrody data_wydania',function(error,movies){
     if(error) {console.error(error);}
     res.send({
       movies: movies
     })
   }).sort({_id:-1})
  })

//Dodanie filmu
app.post('/movies',(req,res) => {
  var db= req.db;
  var title = req.body.nazwa;
  var description = req.body.opis;
  var kategoria = req.body.kategoria_wiekowa;
  var reżyser = req.body.reżyser;
  var gatunek = req.body.gatunek;
  var nagrody = req.body.nagrody;
  var data = req.body.data;

  var new_movie = new Movie({
    nazwa: title,
    opis: description,
    kategoria_wiekowa: kategoria,
    reżyser: reżyser,
    gatunek: gatunek,
    nagrody: nagrody,
    data_wydania: data
  })

  new_movie.save(function(error){
    if(error){
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Movie added successfully!'
    })
  })
})

//Dostanie pojedyńczego filmu
app.get('/movie/:id', (req,res) => {
  var db = req.db;
  Movie.findById(req.params.id, 'nazwa opis', function (error, movie) {
    if (error) { console.error(error); }
    res.send(movie)
  })
})

//Update filmu
app.put('/movies/:id', (req,res) => {
  var db= req.db;
  Movie.findById(req.params.id,"nazwa opis",function(error,movie){
    if(error) {console.error(error);}

    movie.nazwa = req.body.nazwa
    movie.opis = req.body.opis

    movie.save(function(error){
      if(error){console.log(error)}
      res.send({success: true})
    })

  })
})

//Usuwanie filmu

app.delete('/movies/:id', (req,res) => {
  var db = req.db;

  Movie.remove({
    _id: req.params.id
  },function(err,movie){
    if(err) res.send(err)
    res.send({success:true})
  })
})
app.listen(process.env.PORT || 8081)