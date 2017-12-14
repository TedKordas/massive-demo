const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const connectionString = 'postgres://tshxfwnrnyqkfk:7047d9991b39bb73d5c06c2a86be64b20672b83289ed0b5331abf0fb76a8cb09@ec2-54-243-230-78.compute-1.amazonaws.com:5432/db3jumsjlr78e2?ssl=true';


const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  const db = req.app.get('db');
  db.getAllInjuries().then(injuries =>{
    res.send(injuries);
  })
});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db');
  const state = req.query.state;
  if (state) {
    db.getIncidentsByState([state]).then(incidents => {
      res.send(incidents)
    });
  }
  else {
    db.getIncidentsByState().then(incidents => {
      res.send(incidents)
    });
  }    
});

app.post('/incidents', (req, res) => {
  const incident = req.body;
  const db = req.app.get('db')

  db.createIncident([incident.state, incident.injuryid, incident.causeid]).then(results => {
    res.send(results);
  })
});

massive(connectionString).then(db => {
  app.set('db', db)
  app.listen(port, () => {
    console.log('Started server on port', port);
  });
});

