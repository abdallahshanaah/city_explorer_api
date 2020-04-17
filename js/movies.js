'use strict';

const superagent = require('superagent');

function movies(req,res){
  let moviesArray=[];
  const key=process.env.MOVIE_API_KEY;
  const city=req.query.search_query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${city}`;
  superagent(url)
    .then (data =>{
      data.body.results.forEach(element => {
        const movie= new Movies(element, 'https://image.tmdb.org/t/p/w500/');
        moviesArray.push(movie);
      });

      res.send(moviesArray);

    });
}

function Movies(data,path){
  this.title = data.title;
  this.overview = data.overview;
  this.average_votes = data.vote_average;
  this.total_votes = data.vote_count;
  this.image_url = path+data.poster_path;
  this.popularity = data.popularity;
  this.released_on = data.release_date;
}



module.exports = movies;
