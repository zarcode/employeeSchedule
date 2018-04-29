const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const serviceAccount = require("./employee-schedule-fb-key.json");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const config = require("./config.js");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://' + config.firebaseProjectName + '.firebaseio.com/'
});

exports.shifts = functions.https.onRequest(function(request, response) {
  return cors(request, response, function() {
    let startDate;
    let endDate;
    if ('startDate' in request.query && 'endDate' in request.query) {
      startDate = Number(request.query.startDate);
      endDate = Number(request.query.endDate);
    } else {
      response.status(500).send({ message: "Required params are not provided" });
    }

    return admin.database().ref('shifts').orderByChild("date").startAt(startDate).endAt(endDate).once('value', (snapshot) => {
      const event = snapshot.val();
      if (Array.isArray(event)) {
        response.send(event.filter(x => x !== null));
      } else {
        response.send([]);
      }
    });
  });
});

exports.allshifts = functions.https.onRequest(function(request, response) {
  return cors(request, response, function() {
    let startDate;
    let endDate;
    if ('startDate' in request.query && 'endDate' in request.query) {
      startDate = Number(request.query.startDate);
      endDate = Number(request.query.endDate);
    } else {
      response.status(500).send({ message: "Required params are not provided" });
    }
    admin.database().ref('shifts').orderByChild("date").startAt(startDate).endAt(endDate).once('value', (snapshot) => {
      const event = snapshot.val();
      response.send(event || []);
    });
  });
});

exports.employees = functions.https.onRequest(function(request, response) {
  return cors(request, response, function() {
    return admin.database().ref('employees').once('value', (snapshot) => {
      const event = snapshot.val();
      response.send(event || []);
    });
  });
});