var express = require('express');
var router = express.Router();
var GameState = require('./GameState');
var gameState = new GameState();

router.get('/', function(req, res, next) {
    console.log(gameState.participants);
    console.log(gameState.session_data);
    console.log(gameState.standings);
    console.log(gameState.participants);
    res.send(gameState.session_data);
});

module.exports = router;