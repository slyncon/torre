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

app.get('/listAll', (request,response)=>{
    requestPromise(options)
        .then(function(parseBody){
            var peopleData = parseBody;
            
            // peopleData.forEach(element => {
            //     const name = element.name;
            // });

            response.render('listAll');
        })
        .catch((error) => {
            return console.log(error);
        })
});

app.post('/searchTorrex', (request,response) =>{
    
    const nameForSearch = request.body.name;
    const URL = 'https://torre.bio/api/people?q=' + request.body.name;

    var options = {
        method :   'GET'
       ,uri    :   URL
       ,json   :   true
    };

    requestPromise(options)
        .then(function(parseBody){
            var peopleData = parseBody;
            peopleData.forEach(element => {
                
            });
            response.render('searchTorrex',{peopleData});
        })
        .catch((error) => {
            return console.log(error);
        })
});

exports.app = functions.https.onRequest(app);

