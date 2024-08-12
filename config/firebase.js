const firebase = require("firebase/app");
const admin = require("firebase-admin");

const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

const credentials = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const firebaseConfig = require("../firebase-config.json");
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = {
  getAuth,
  createUserWithEmailAndPassword,
  admin,
};
