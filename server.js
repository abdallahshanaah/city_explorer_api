'use strict';

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const client = require('./js/DB.js');
const PORT = process.env.PORT ||3000 ;
const server=express();
server.use(cors());



//test
server.get('/', (req, res)=> {
  res.status(200).send('Working....');
});
//location
const locationFun = require('./js/location.js');
server.get('/location', locationFun);

//yelp
const yelpFunction = require('./js/yelp.js');
server.get('/yelp', yelpFunction);

//weather
const weatherFun = require('./js/weather.js');
server.get('/weather', weatherFun);

//movies
const moviesFun = require ('./js/movies.js');
server.get('/movies', moviesFun);

const trailsFun = require ('./js/trails');
server.get('/trails', trailsFun);


//error
server.use('*',( req,res)=>{
  let obj={'error': [{'status': 500, 'responseText': 'Sorry, something went wrong'}]};
  res.status(obj.error[0].status).send(obj.error);
});


//DB
client.connect()
  .then (()=>{
    server.listen(PORT, ()=>{
      console.log('listening from port ', PORT);
      console.log(typeof(PORT));
    });

  });
