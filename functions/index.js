const functions = require("firebase-functions")
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/activities', (req, res) => {
  // get activities from firestore
  // form the documents we get back into a json array
  // [optional: setup Caching]
  // send json array with status 200
  res.status(200).json([{
    name: 'Client Work',
    totalTime: 900,
  },{
    name: 'Personal Project',
    totalTime: 750,
  }])
})

exports.app = functions.https.onRequest(app)
