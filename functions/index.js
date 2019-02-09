const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const requestPromise = require('request-promise');

const firebaseApp = firebase.initializeApp(functions.config().firebase);

const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

app.get('/',(request, response) => {
    response.set('Cache-control','public, max-age=300, s-maxage=600');
    response.render('index');
});

var options = {
     method :   'GET'
    ,uri    :   'https://torre.bio/api/people'
    ,json   :   true
};

app.get('/listAll', (request,response)=>{
    requestPromise(options)
        .then(function(parseBody){
            var peopleData = parseBody;
            
            peopleData.forEach(element => {
                const name = element.name;
            });
            response.render('listAll');
        })
        .catch((error) => {
            return console.log(error);
        })
});

exports.app = functions.https.onRequest(app);

