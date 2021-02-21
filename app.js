var express = require('express');
const { F1TelemetryClient, constants } = require('f1-telemetry-client');
const { PACKETS } = constants;
var app = express();

app.get('/', function (req, res) {
res.send('Hello World!');
});

const client = new F1TelemetryClient({ port: 20777, bigintEnabled: true });
client.on(PACKETS.event, console.log);
client.on(PACKETS.motion, console.log);
client.on(PACKETS.carSetups, console.log);
client.on(PACKETS.lapData, console.log);
client.on(PACKETS.session, console.log);
client.on(PACKETS.participants, console.log);
client.on(PACKETS.carTelemetry, console.log);
client.on(PACKETS.carStatus, console.log);
client.on(PACKETS.finalClassification, console.log);
client.on(PACKETS.lobbyInfo, console.log);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening');
    client.start();
});