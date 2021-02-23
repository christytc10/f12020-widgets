var express = require('express');
var GameState = require('./GameState.js');
var gameState = new GameState();

var app = express();

app.get('/', function (req, res) {
    console.log(gameState.standings);
    res.send(gameState.standings);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening');
});