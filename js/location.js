'use strict';

const superagent = require('superagent');
const client = require('./DB.js');


function theLocation(req,res)
{
  const theLocation=req.query.city;
  let SQL =`SELECT * FROM thelocations WHERE search_query='${theLocation}'`;
  console.log(SQL);
  client.query(SQL)
    .then(data =>{
      if (data.rows.length >0){
        console.log('from DB',data.rows);
        res.send(data.rows[0]);}
      else {
        const key= process.env.GEOCODE_API_KEY;
        const url= `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${theLocation}&format=json`;
        superagent.get(url)
          .then(data1 =>{
            const locationInfo= new Location(theLocation, data1.body);
            res.send(locationInfo);
            let SQL = 'INSERT INTO thelocations (search_query,formatted_query,latitude,longitude) VALUES ($1,$2,$3,$4)';
            let safeValues= [locationInfo.search_query , locationInfo.formatted_query , locationInfo.latitude , locationInfo.longitude];
            client.query(SQL, safeValues)
              .then( data =>{
                console.log('added to DB',data.rows);
              });
          });
      }
    })
    .catch (() => { res.send('error'); });
}

function Location(location, data){
  this.search_query= location;
  this.formatted_query=data[0].display_name;
  this.latitude= data[0].lat;
  this.longitude= data[0].lon ;
}


module.exports = theLocation;
