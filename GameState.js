const { F1TelemetryClient, constants } = require('f1-telemetry-client');
const { PACKETS } = constants;

class GameState {

    constructor() {
        //this._standings = [];
        this._participants = new Map();

        this._udpclient = new F1TelemetryClient({ port: 20777, bigintEnabled: true });
        this._udpclient.start();
        //this._udpclient.on(PACKETS.event, console.log);
        //this._udpclient.on(PACKETS.lapData, m => this.parseLapData(this, m));
        //this._udpclient.on(PACKETS.session, m => this.parseSessionData(this, m));
        this._udpclient.on(PACKETS.participants, m => this.parseParticipants(this, m));
        //this._udpclient.on(PACKETS.carStatus, m => this.parseCarStatusData(this, m));
        //this._udpclient.on(PACKETS.finalClassification, console.log);
        //this._udpclient.on(PACKETS.lobbyInfo, console.log);
    }

    get standings() {
        return this._standings;
    }

    get participants() {
        return this._participants;
    }

    get session_data() {
        return this._session_data;
    }

    get car_status() {
        return this._car_status;
    }

    set standings(val){
        this._standings = val;
    }

    set participants(val){
        this._participants = val;
    }

    set session_data(val){
        this._session_data = val;
    }

    set car_status(val){
        this._car_status = val;
    }

    parseParticipants(gamestateref, packet){
        var i;
        for (i = 0; i < packet.m_participants.length; i++) {
            gamestateref.participants.set(i, packet.m_participants[i]);
        }
    }

    parseLapData(gamestateref, packet){
        var i;
        for (i = 0; i < packet.m_lapData.length; i++) {
            var lapData = packet.m_lapData[i];
            //standings_entry = {"driver": participants[i], "lapData": lapData};
            //gamestateref.standings[lap_data.m_carPosition] = standings_entry;
        }
    }

    parseCarStatusData(gamestateref, packet){
        var i;
        for (i = 0; i < packet.m_carStatusData.length; i++) {
            gamestateref._car_status[i] = packet.m_carStatusData[i];
        }
    }

    parseSessionData(gamestateref, packet){
        gamestateref.session_data = packet.m_sessionData;
    }
}
module.exports = GameState;