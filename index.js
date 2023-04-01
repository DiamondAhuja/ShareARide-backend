// things we need to import

var express = require('express');
var app = express();
const PORT = process.env.PORT || 5050
const { books } = require('./handlers/books')
const { registerUser } = require('./handlers/registerUser')
const { admin } = require("./util/admin");
const { firebase } = require("./util/firebase");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

///////////////////////////////////////////

// API CALLS

// testing api call
app.get('/books', books);

// api call for initialization
app.get('/', (req, res) => {
    res.send('The server is up and running.');
    console.log("SERVER UP AND WORKING.");
})

// API CALL for Creating an account  ///////////////////////// DONE
app.post('/registeraccount/', function(req, res){
    console.log(req.body);
    let email = req.body.email; 
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phonenumber = req.body.phonenumber;
    let address = req.body.address;
    let DOB = req.body.DOB;

    admin.auth().createUser({
        email: email,
        password: password,    
    }).then((userRecord) => {
        const user = userRecord.uid;
        res.send("Account created successfully");
        console.log("Success, here is the UID:", user);

        var docData = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber,
            address: address,
            DOB: DOB,
            CUID: user
        };

    // call registerUser function with the data
    // this function will create a document for the user with the parameters defined

    registerUser(docData, res);

    })
    .catch((error) => {
        res.send("failed");
        console.log("failed", error);
    });
});

// API CALL for Logging in
app.post('/login/', function(req, res){
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        res.send("Login successful");
        console.log("Login successful");
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.send("Login failed " + errorMessage);
        console.log("Login failed", error);
    });
});

// API CALL for Logging out
app.post('/logout/', function(req, res){
    firebase.auth().signOut().then(() => {
        res.send("Logout successful");
        console.log("Logout successful");
    }).catch((error) => {
        res.send("Logout failed");
        console.log("Logout failed", error);
    });
});

// API CALL for Sending a friend request
app.post('/addfriend/', function(req, res){
    var UID_requestor = req.body.UID_requestor;
    var UID_friend_wanna_add = req.body.UID_friend_wanna_add
})



app.listen(PORT, function() {
    console.log(`Demo project at: ${PORT}!`);
});