const firebase = require('firebase');

const firebaseConfig = {
    
  };

firebase.initializeApp(firebaseConfig); // initialize firebase app
module.exports = { firebase }; // export the app