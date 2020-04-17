'use strict';

const superagent = require('superagent');


function weather (req,res){
  let arrofObj=[];
  const theWeather=req.query.search_query;
  const key=process.env.WEATHER_API_KEY;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${theWeather}&key=${key}`;

  superagent.get(url)
    .then(weatherData =>{
      weatherData.body.data.map(element => {
        const weatherInfo= new Weather(theWeather, element);
        arrofObj.push(weatherInfo);
      });
      res.send(arrofObj);
    });
}

function Weather(weather, theData){
  this.search_query= weather;
  this.forecast= theData.weather.description;
  this.time= theData.datetime;
}

module.exports = weather;
