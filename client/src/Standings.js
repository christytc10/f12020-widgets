import React from 'react';

class Standings extends React.Component {
  constructor(props) {
    super(props);

    this.standings = []
  }

  componentDidMount() {
    this.timer = setInterval(()=> this.getStandings(), 1000);
  }
  
  componentWillUnmount() {
    this.timer = null;
  }
  
  getStandings() {
    fetch("http://localhost:9000/telemetry/standings")
      .then(result => result.json())
      .then(result => this.standings =( result ));
    console.log(this.standings);
    /*
    (2) [{…}, {…}]
    0: {name: "Driver1"}
    1: {name: "Driver2"}
    length: 2
    __proto__: Array(0)
    */
  }

  render() {
    return(
      <div>
        <p>STANDINGS</p>
        <div>
          {this.standings.map(d => <li key={d.name}>{d.name}</li>)}
        </div>
        
      </div>
    );
  }
}

export default Standings;
