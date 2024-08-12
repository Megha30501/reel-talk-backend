const firebase = require("firebase/app");
require("firebase/auth") ;

const admin = require("firebase-admin");
const credentials = require("../serviceAccountKey.json");

const firebaseConfig = require("../firebase-config.json");
firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

module.exports = {firebase, admin};