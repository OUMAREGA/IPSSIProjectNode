const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const https = require("https") //importation du module https
const fs = require("fs") //importation de fs pour lire des fichiers
const app = express();
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./swagger.json")
    //const hostname = '0.0.0.0';
const port = 3000;
mongoose.connect('mongodb://mongo/insight_BDD');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

const moduleRoute = require('./routes/routesModule');
const userRoute = require("./routes/routesUser")
const notesRoute = require("./routes/routesNote")
const sessionRoute = require('./routes/routesSession');
const userByTokenRoute = require('./routes/userByTokenRoute');

moduleRoute(app);
userRoute(app);
sessionRoute(app);
notesRoute(app);
userByTokenRoute(app);

https.createServer({ //configuration HTTPS
    key: fs.readFileSync("https/server.key"), //récupération du fichier server.key (clé de cryptage --> clé PRIVÉE)
    cert: fs.readFileSync("https/server.cert") //récupération du fichier cert (certificat)
}, app).listen(port)