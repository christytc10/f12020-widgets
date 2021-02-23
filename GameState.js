const { F1TelemetryClient, constants } = require('f1-telemetry-client');
const { PACKETS } = constants;

class GameState {

    constructor() {
        this._standings = [];
        this._participants = new Map();
        console.log("CONSTRUCTOR");
        console.log(this._participants);
        this._udpclient = new F1TelemetryClient({ port: 20777, bigintEnabled: true });
        this._udpclient.start();
        //this._udpclient.on(PACKETS.event, console.log);
        //this._udpclient.on(PACKETS.lapData, this.parseLapData);
        //this._udpclient.on(PACKETS.session, this.parseSessionData);
        this._udpclient.on(PACKETS.participants, this.parseParticipants);
        //this._udpclient.on(PACKETS.carStatus, this.parseCarStatusData);
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

    set participants(val){
        this._participants = val;
    }

    parseParticipants(packet){
        console.log(this)
        var i;
        for (i = 0; i < packet.m_participants.length; i++) {
            this.participants.set(i, packet.m_participants[i]);
        }
    }

    parseLapData(packet){
        var i;
        for (i = 0; i < packet.m_lapData.length; i++) {
            lapData = packet.m_lapData[i];
            standings_entry = {"driver": participants[i], "lapData": lapData};
            this._standings[lap_data.m_carPosition] = standings_entry;
        }
    }

    parseCarStatusData(packet){
        var i;
        for (i = 0; i < packet.m_carStatusData.length; i++) {
            this._car_status[i] = packet.m_carStatusData[i];
        }
    }

    parseSessionData(packet){
        this._session_data = packet.m_sessionData;
    }
}
module.exports = GameState;