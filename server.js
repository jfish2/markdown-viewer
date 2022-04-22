const express = require('express');
const app = express()

//set view engine to ejs
app.set('view engine', 'ejs');

//set public folder for static assets
app.use(express.static(__dirname + '/public'));

//routes
app.get('/', function(request,response) {
    response.render('md-pad');
});

app.get('/(:id)', function(request, response) {
    response.render('md-pad');
});

//get sharejs dependencies
const sharejs = require('share');
require('redis');

//options for sharejs
const options = {
    db: {type: 'redis'},
};

//attach express server to sharejs
sharejs.server.attach(app, options)

//listen on port 3000 or the port defined for heroku once moved to prod
const port = process.env.PORT || 5000;
app.listen(port);