const admin = require('firebase-admin')
const serviceAccount = require('../../credentials.json')

let db;

function authDB() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    db = admin.firestore()
  }
}

exports.getActivities = (req, res) => {
  authDB()
  db.collection('activities').get() //.where('userId','==', userId)
    .then(collection => {
        const activityResults = collection.docs.map(doc => {
          let activity = doc.data()
          activity.id = doc.id
          return activity
        })
        res.status(200).json(activityResults)
    })
    .catch(e => {
      res.status(500).send('Error retrieving activities: ' + e)
    })
}

exports.postActivity = (req, res) => {
  if(!req.body || !req.body.name || !req.body.userId){
    res.status(401).send('Missing new Activity data')
  }
  authDB()
  const now = admin.firestore.FieldValue.serverTimestamp()
  let newActivity = {
    name: req.body.name,
    totalDuration: 0,
    userId: req.body.userId,
    logs: [],
    created: now,
    updated: now,
  }
  db.collection('activities').add(newActivity)
    .then(() => {
      this.getActivities(req, res)
    })
    .catch(e => {
      res.status(500).send('Error creating new Activity: ' + e)
    })
}