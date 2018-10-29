const express = require('express')
const app = express()
const db = require('./db')();
const bodyParser = require('body-parser')

const port = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', require('./routes.js'));

app.listen(port, () => console.log(`Dulce listening on port ${port}!`))
