const { db } = require("../util/admin");

// this function will create a document for the user with the parameters defined
const customerinformationDB = db.collection('CustomerInformationDB');

exports.registerUser = async (data, res) => {
    try {
        //console.log(data);
        db.collection("CustomerInformationDB").doc(data.CUID).create({
            "cuid": data.CUID,
            "firstName": data.firstname,
            "lastName": data.lastname,
            "phoneNumber": data.phonenumber,
            "address": data.address,
            "DiscordAuthToken": "",
            "DOB": data.DOB,
            "rating": 5.0,
            "num_ratings": 0,
            "friendRequestList": [],
            "friendList": [],
            "sentFriendRequestList": [],
            "email": data.email
        })
            .then((docRef) => {
                console.log("Document written with ID: ", data.CUID);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    } catch (error) {
        console.log("Something went wrong, please try again", error);
    }
};