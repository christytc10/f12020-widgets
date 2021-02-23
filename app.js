var express = require('express');
var GameState = require('./GameState.js');
var gameState = new GameState();

var app = express();

app.get('/', function (req, res) {
    console.log(gameState.participants);
    console.log(gameState.session_data);
    console.log(gameState.standings);
    console.log(gameState.participants);
    res.send(gameState.session_data);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening');
});