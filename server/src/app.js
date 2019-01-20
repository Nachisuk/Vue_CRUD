const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var async = require('async');
var mongoose = require('mongoose');
var Promise = require("bluebird");

mongoose.connect('mongodb://localhost:27017/movies');

var db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",function(callback){
  console.log("Connection succeded");
})

var Movie = require("../models/movie");
var Director = require("../models/director");
var Genre = require("../models/genre");
var ContentRating = require("../models/contentRating");
var Awards = require("../models/nagrody");

//Dostanie wszystkich filmów
app.get('/movies', (req, res) => {
   Movie.find({},'nazwa opis reżyser kategoria_wiekowa gatunek nagrody data_wydania',function(error,movies){
     if(error) {console.error(error);}
     res.send({
       movies: movies
     })
   }).populate('reżyser').populate('gatunek')
   .populate('nagrody').populate('kategoria_wiekowa').sort({_id:-1})
  })

//Dostanie wszystkich reżyserów
app.get('/directors',(req,res) => {
  Director.find({},function(error,director){
    if(error) {console.error(error);}
    res.send({
      director: director
      
    })
  })
})
//Dostanie wszystkich gatunków
app.get('/genres',(req,res) => {
  Genre.find({},function(error,genre){
    if(error) {console.error(error);}
    res.send({
      genre: genre
    })
  })
})
//Dostanie wszystkich nagród
app.get('/awards',(req,res) =>{
  Awards.find({},function(error,awards){
    if(error) {console.error(error);}
    res.send({
      awards: awards
    })
  })
})
//Dostanie wszystkich kategorii wiekowych
app.get('/content',(req,res) =>{
  ContentRating.find({},function(error,content){
    if(error) {console.error(error);}
    res.send({
      content: content
    })
  })
})
//Dodanie filmu
app.post('/movies',(req,res) => {
  var db= req.db;
  var title = req.body.nazwa;
  var description = req.body.opis;
  var kategoria = new ContentRating({
    nazwa:"Przyrodniczy",
    opis:"O zwierzętach"
  });
  kategoria.save(function(error){if(error){console.log(error)}})
  
  var reżyser = req.body.rezyser;
  var gatunekArray = req.body.gatunek;


 

  var nagrodyArray = req.body.nagrody;
  var pomArray2 = [];
  nagrodyArray.forEach(function(item){
    var award = new Awards({
      nazwa: "Janusz",
      opis: "o Januszach",
      obrazek: "elo",
      opis_2: ""
    })
    pomArray2.push(award);
    award.save(function(error){if(error){console.log(error)}})
  })
  var nagrody = pomArray2;

  var data = req.body.data;

  var new_movie = new Movie({
    nazwa: title,
    opis: description,
    kategoria_wiekowa: kategoria,
    reżyser: reżyser,
    gatunek: gatunekArray,
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
//Dodanie gatunku
app.post('/genres',(req,res) => {
  var new_genre = new Genre({
    nazwa: req.body.nazwa,
    opis: req.body.opis,
  })
  new_genre.save(function(error){
    if(error){console.log(error)}
    res.send({
      success: true,
      message: 'Genre added successfully!'
    })
    } 
    )
})
//Dodanie reżysera
app.post('/directors',(req,res) => {
  var new_director = new Director({
    imie: req.body.imie,
    nazwisko: req.body.nazwisko,
    data_urodzenia: req.body.data_urodzenia
  })
  new_director.save(function(error){
    if(error){console.log(error)}
    res.send({
      succes: true,
      message: "Director added succesfully"
    })
  })
})

//Dodanie kategorii wiekowej
app.post('/content',(req,res) => {
  var new_content = new ContentRating({
   nazwa: req.body.nazwa,
   opis: req.body.opis
  })
  new_content.save(function(error){
    if(error){console.log(error)}
    res.send({
      succes: true,
      message: "Content added succesfully"
    })
  })
})

//Dodanie nagrody
app.post('/awards',(req,res) => {
  var new_award = new Awards({
   nazwa: req.body.nazwa,
   opis: req.body.opis,
   obrazek: req.body.obrazek,
   opis_2: req.body.opis_2
  })
  new_award.save(function(error){
    if(error){console.log(error)}
    res.send({
      succes: true,
      message: "Award added succesfully"
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