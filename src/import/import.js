var mongoose = require('mongoose');

// make a connection
mongoose.connect('mongodb://mongo/insight_BDD',{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)
const users = require("../data/users.json")
const color = require("cli-color")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
for(user of users)
{
    user.password = bcrypt.hashSync(user.password,10)
    if(user.roleId == "étudiant")
    {
        user.sessionId = ""
    }
}

User.insertMany(users).then((docs) => { console.log("Utilisateurs importés"); process.exit() })
    .catch((err) => {
        let errors = []
        if (err.errors) {

            Object.values(err.errors).forEach((e) => { //on récupère les erreurs par attribut erroné
                errors[e.path] = e.message
                console.log("Problème pour : " + e.value)
                console.log(e.path+": "+e.message)
            })
        }else{
            console.log(err)
        }
        process.exit()
    })