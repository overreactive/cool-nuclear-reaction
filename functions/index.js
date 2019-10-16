const functions = require('firebase-functions')
const algolia = require('./algolia')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Update the search index every time a blog post is written.
exports.onProjectCreate = functions.firestore
  .document('projects/{projectId}')
  .onCreate(algolia.indexProject)
