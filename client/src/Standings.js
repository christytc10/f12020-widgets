import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Standingssss() {
  const [standings, setStandings] = useState([]);

  const addItem = event => {
    event.preventDefault();
    fetch("http://localhost:9000/telemetry/standings")
      .then(result => result.json())
      .then(result => setStandings( result ));
  };

  return (
    <>
      <h3>STANDINGS</h3>
      <ul>
        {standings.map(s => (
          <li key={s.name}>{s.name}</li>
        ))}
      </ul>
    </>
  );
}
 
function Standings() {
  const [data, setData] = useState([]);
 
  useEffect(async () => {
    const result = await axios(
      'http://localhost:9000/telemetry/standings',
    );
    setData(result.data);
  }, []);
 
  return (
    <ul>
      {data.map(driver => (
        <li key={driver.name}>{driver.name}</li>
      ))}
    </ul>
  );
}

export default Standings;
