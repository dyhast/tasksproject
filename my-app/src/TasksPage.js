const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const urlencodedParser = express.urlencoded({extended: false});



app.get('/', function (request, response) {
    response.sendFile(__dirname + '../public/Tasks.html');
});