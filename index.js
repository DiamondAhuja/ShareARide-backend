// things we need to import

var express = require('express');
var app = express();
const PORT = process.env.PORT || 5050
const { books } = require('./handlers/books')
const { registerUser, getUserInfo } = require('./handlers/createAccount_Controller')
const { getFriends, sendFriendRequest, acceptFriendRequest, declineFriendRequest, removeFriend } = require('./handlers/addFriends_Controller')
const { deleteUser, editUserProfile } = require('./handlers/profileEditing_Controller')
const { admin } = require("./util/admin");
const { firebase } = require("./util/firebase");
const bodyParser = require('body-parser');
const { rateUser } = require('./handlers/rating_Controller');
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
app.post('/registeraccount/', function (req, res) {
    //console.log(req.body);
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
        res.send({ Message: "Registration successful!", UID: user });
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
app.post('/login/', function (req, res) {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            res.json({ Message: "Login successful!", UID: user.uid });
            console.log("Login successful", user.uid);
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
app.post('/logout/', function (req, res) {
    firebase.auth().signOut().then(() => {
        res.send("Logout successful");
        console.log("Logout successful");
    }).catch((error) => {
        res.send("Logout failed");
        console.log("Logout failed", error);
    });
});

// API CALL for Getting a user's information
app.get('/getuserinfo/', function (req, res) {
    var UID = req.body.UID;
    getUserInfo(UID, res);
});

// API CALL for editing user profile
app.post('/editprofile', function (req, res) {
    var Data = {
        CUID: req.body.UID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        DiscordAuthToken: req.body.DiscordAuthToken,
        DOB: req.body.DOB,
        rating: req.body.rating,
        friendRequestList: req.body.friendRequestList,
        friendList: req.body.friendList,
        sentFriendRequestList: req.body.sentFriendRequestList,
        email: req.body.email
    };
    editUserProfile(Data, res);
});

// API CALL for deleting user
app.post('/deleteuser/', function (req, res) {
    var UID = req.body.UID;
    deleteUser(UID, res);
});

// API CALL for Sending a friend request
app.post('/sendfriendrequest/', function (req, res) {
    var Data = {
        requestor_CUID: req.body.UID_requestor,
        reciever_CUID: req.body.UID_reciever
    };
    //console.log(Data);
    sendFriendRequest(Data, res);
});

// API CALL for GET FRIENDS LIST
app.get('/getfriendslist/', function (req, res) {
    var UID = req.body.UID;
    getFriends(UID, res);
});

// API CALL for ACCEPTING a friend request
app.post('/acceptfriendrequest/', function (req, res) {
    var Data = {
        requestor_CUID: req.body.UID_requestor,
        acceptor_CUID: req.body.UID_acceptor
    };
    //console.log(Data);
    acceptFriendRequest(Data, res);
});

// API CALL for DECLINING a friend request
app.post('/declinefriendrequest/', function (req, res) {
    var Data = {
        requestor_CUID: req.body.UID_requestor,
        decliner_CUID: req.body.UID_decliner
    };
    //console.log(Data);
    declineFriendRequest(Data, res);
});

// API CALL for REMOVING a friend 
app.post('/removefriend/', function (req, res) {
    var Data = {
        remover_CUID: req.body.UID_remover,
        removed_CUID: req.body.UID_removed
    };
    //console.log(Data);
    removeFriend(Data, res);
});

// API CALL for rating a user
app.post('/rateuser', function (req, res) {
    var Data = {
        CUID: req.body.UID,
        rating: req.body.rating
    };
    rateUser(Data, res);
});


app.listen(PORT, function () {
    console.log(`Demo project at: ${PORT}!`);
});