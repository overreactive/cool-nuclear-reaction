/**
 * NOTE: This file is ignored from git tracking. In a CI environment it is
 * generated by firebase-ci based on config in .firebaserc (see .gitlab-ci.yaml).
 * This is done so that environment specific settings can be applied.
 */

export const env = "local";

// Config for firebase
export const firebase = {
  apiKey: "AIzaSyCCA9ZDnkqqTq9OAB8SFd4h0guODmBNR6o",
  authDomain: "cool-nuclear-reaction.firebaseapp.com",
  databaseURL: "https://cool-nuclear-reaction.firebaseio.com",
  projectId: "cool-nuclear-reaction",
  storageBucket: "cool-nuclear-reaction.appspot.com",
  messagingSenderId: "927834006880",
  appId: "1:927834006880:web:d30dd6119e86bc821caa05",
  measurementId: "G-LGJVJPJ819"
};

// Config to override default reduxFirebase config in store/createStore
// which is not environment specific.
// For more details, visit http://react-redux-firebase.com/docs/api/enhancer.html
export const reduxFirebase = {
  userProfile: 'users',
  enableLogging: false, // enable/disable Firebase Database Logging
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

export default {
  env,
  firebase,
  reduxFirebase
};
