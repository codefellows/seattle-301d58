'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
require('ejs');
const superagent = require('superagent');
const pg = require('pg');

// middleware
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

const PORT = process.env.PORT || 3001;

// routes
app.get('/', displayAllBooks);
app.get('/books/:book_id', displayOneBook);
app.get('/searches/new', displaySearchPage);


function displayAllBooks(request, response){
  // go to DB, get the books, and display them
  let sql = 'SELECT * FROM books;';
  client.query(sql)
    .then(results => {
        response.render('./index.ejs', {bananas: results.rows})
    })
}

function displayOneBook(request, response){
  // get the params from the url
  // go to the DB with id - find the Book
  // display the details

  let id = request.params.book_id;

  let sql = 'SELECT * FROM books WHERE id=$1;';
  let safeValues =[id];

  client.query(sql, safeValues)
    .then(results => {
      response.render('./detail.ejs', {bananas: results.rows});
    })
}

function displaySearchPage(request, response){
  // display the search page
  response.render('./add-view.ejs');
}

function Book(obj){
  this.title = obj.title ? obj.title : 'No title for you.';
  this.authors = obj.authors.join(', ');
  this.description = obj.description;
  if(obj.imageLinks && obj.imageLinks.thumbnail){ // short-circuit evaluation
      this.imageurl = obj.imageLinks.thumbnail;
  } else{
      this.imageurl = '/images/default.jpg';
  }
  this.imageurl = this.imageurl.slice(0,5)==='http:' ? 'https:'+this.imageurl.slice(5) : this.imageurl;
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  })