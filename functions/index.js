const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');

const firebaseApp = firebase.initializeApp(functions.config().firebase);

const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

app.get('/timestamp',(request, response) => {
    response.send(`${Date.now()}`);
});

app.get('/',(request, response) => {
    response.set('Cache-control','public, max-age=300, s-maxage=600');

    const helloTorre = "Hello Torrexes";
    const statusOk = "My environment is up and running - Happy to take this exam =D";

    response.render('index', { helloTorre, statusOk });
});

exports.app = functions.https.onRequest(app);

