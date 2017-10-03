const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./controller.js');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/users', controller.getAllUsers);
app.get('/user/:id', controller.getUser);
app.post('/create', controller.createUser);
app.delete('/user/:id', controller.deleteUser)

massive('postgres://cjztagmn:Y49_DVM0BuNAFvweizUWsAvRuKN8o0HE@elmer.db.elephantsql.com:5432/cjztagmn').then( db => {
    
    app.set('db', db)
    
    const port = 3030;
    app.listen(port, () => {console.log(`Server Listening on Port ${port}`);});

});
