const { F1TelemetryClient, constants } = require('f1-telemetry-client');
const { PACKETS } = constants;

class GameState {
    
    constructor() {
        this._standings = ["A. Driver"];
        this._udpclient = new F1TelemetryClient({ port: 20777, bigintEnabled: true });
        this._udpclient.start();
        this._udpclient.on(PACKETS.event, console.log);
        this._udpclient.on(PACKETS.motion, console.log);
        this._udpclient.on(PACKETS.carSetups, console.log);
        this._udpclient.on(PACKETS.lapData, console.log);
        this._udpclient.on(PACKETS.session, console.log);
        this._udpclient.on(PACKETS.participants, console.log);
        this._udpclient.on(PACKETS.carTelemetry, console.log);
        this._udpclient.on(PACKETS.carStatus, console.log);
        this._udpclient.on(PACKETS.finalClassification, console.log);
        this._udpclient.on(PACKETS.lobbyInfo, console.log);
    }

    get standings() {
        return this._standings;
    }
}
module.exports = GameState;