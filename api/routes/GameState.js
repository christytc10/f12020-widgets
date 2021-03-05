const { F1TelemetryClient, constants } = require('f1-telemetry-client');
const { PACKETS } = constants;

class GameState {

    constructor() {
        this._standings = new Map();
        this._participants = new Map();
        this._session_data = {};
        this._car_status = new Map();
        this._lap_data = {};

        this._udpclient = new F1TelemetryClient({ port: 20777, bigintEnabled: true });
        this._udpclient.start();

        this._udpclient.on(PACKETS.lapData, m => this.parseLapData(this, m));
        this._udpclient.on(PACKETS.session, m => this.parseSessionData(this, m));
        this._udpclient.on(PACKETS.participants, m => this.parseParticipants(this, m));
        this._udpclient.on(PACKETS.carStatus, m => this.parseCarStatusData(this, m));
        this._udpclient.on(PACKETS.event, m => this.parseEventData(this, m));
        //this._udpclient.on(PACKETS.finalClassification, console.log);
        //this._udpclient.on(PACKETS.lobbyInfo, console.log);
    }

    pullStandings(){
        return [{"name":"Driver1"},{"name":"Driver2"}];
    };

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
    
    get lap_data() {
        return this._lap_data;
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

    set lap_data(val){
        this._lap_data = val;
    }

    parseParticipants(gamestate, packet){
        var i;
        for (i = 0; i < packet.m_participants.length; i++) {
            var participant = {
                "name": packet.m_participants[i].m_name,
                "nationality": packet.m_participants[i].m_nationality,
                "driverId": packet.m_participants[i].m_driverId,
                "raceNumber": packet.m_participants[i].m_raceNumber,
                "teamId": packet.m_participants[i].m_teamId,
                "name": packet.m_participants[i].m_name
            };
            gamestate.participants.set(i, participant);
        }
    }

    parseLapData(gamestate, packet){
        var i;
        var laps = [];
        for (i = 0; i < packet.m_lapData.length; i++) {
            var lapData = {
                "carPosition": packet.m_lapData[i].m_carPosition,
                "penalties": packet.m_lapData[i].m_penalties,
                "gridPosition": packet.m_lapData[i].m_gridPosition,
                "resultStatus": packet.m_lapData[i].m_resultStatus
            };
            laps.push(lapData);
        }
        gamestate.lapData = laps;
    }

    parseCarStatusData(gamestate, packet){
        var i;
        for (i = 0; i < packet.m_carStatusData.length; i++) {
            var carStatus = {
                "tyresWear": packet.m_carStatusData[i].m_tyresWear,
                "actualTyreCompound": packet.m_carStatusData[i].m_actualTyreCompound,
                "visualTyreCompound": packet.m_carStatusData[i].m_visualTyreCompound,
                "tyresAgeLaps": packet.m_carStatusData[i].m_tyresAgeLaps
            }
            gamestate.car_status.set(i, carStatus);
        }
    }

    parseSessionData(gamestate, packet){
        var session_info = {
            "weather": packet.m_weather,
            "trackTemperature": packet.m_trackTemperature,
            "airTemperature": packet.m_airTemperature,
            "totalLaps": packet.m_totalLaps,
            "sessionType": packet.m_sessionType,
            "trackId": packet.m_trackId,
            "safetyCarStatus": packet.m_safetyCarStatus,
            "numWeatherForecastSamples": packet.m_numWeatherForecastSamples,
            "weatherForecastSamples": packet.m_weatherForecastSamples
        }
        gamestate.session_data = session_info;
    }

    parseEventData(gamestate, packet){
        //TODO - what to do with events?
        console.log(packet);
        switch (packet.m_eventStringCode){
            case "PENA":
                // A penalty has been issued – details in event
                break;
            case "RCWN":
                // The race winner is announced
                break;
            case "RTMT":
                // When a driver retires
                break;
            case "FTLP":
                // When a driver achieves the fastest lap
                break;
            default:
                console.log(packet.m_eventStringCode + " is unmapped");
        }
    }
}
module.exports = GameState;