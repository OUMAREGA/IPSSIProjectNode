const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const hostname = '0.0.0.0';
const port = 3000;


mongoose.connect('mongodb://mongo/insight_BDD');

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());


const moduleRoute = require('./routes/modulesRoute');
const sessionRoute = require('./routes/routesSession');

moduleRoute(app);
sessionRoute(app);


app.listen(port, hostname);