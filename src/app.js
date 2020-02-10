const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const https = require("https") //importation du module https
const fs = require("fs") //importation de fs pour lire des fichiers
const app = express();
require("dotenv").config({ path: ".env" }) //importation du fichier .env (sera utilisable par les controllers)
    //const hostname = '0.0.0.0';
const port = 3000;


mongoose.connect('mongodb://mongo/insight_BDD');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const moduleRoute = require('./routes/routesModule');
const userRoute = require("./routes/routesUser")
const notesRoute = require("./routes/routesNote")
const sessionRoute = require('./routes/routesSession');

moduleRoute(app);
userRoute(app);
sessionRoute(app);
notesRoute(app);

https.createServer({ //configuration HTTPS
    key: fs.readFileSync("https/server.key"), //récupération du fichier server.key (clé de cryptage --> clé PRIVÉE)
    cert: fs.readFileSync("https/server.cert") //récupération du fichier cert (certificat)
}, app).listen(port)
