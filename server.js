const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const WebSocket = require('ws');

const app = express()
const port = process.env.PORT || 8000;

require('./db')();
require('./utlity/passport')

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(require('./utlity/tokenChecker'));

app.use('/api', require('./routes.js'));

const server = app.listen(port, () => console.log(`Dulce listening on port ${port}!`))

require('./wss')(new WebSocket.Server({ server }))