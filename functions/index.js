const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const requestPromise = require('request-promise');
const bodyParser = require("body-parser");

const firebaseApp = firebase.initializeApp(functions.config().firebase);

const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(request, response) => {
    response.set('Cache-control','public, max-age=300, s-maxage=600');
    response.render('index');
});

app.post('/searchTorrex', (request,response) =>{
    
    response.set('Cache-control','public, max-age=3000, s-maxage=6000');
    
    const URL = 'https://torre.bio/api/people?q=' + request.body.name;

    var options = {
        method :   'GET'
       ,uri    :   URL
       ,json   :   true
    };

    requestPromise(options)
        .then( (peopleData) => {
            response.render('searchTorrex',{peopleData});
        })
        .catch((error) => {
            return console.log(error);
        })
});

exports.app = functions.https.onRequest(app);