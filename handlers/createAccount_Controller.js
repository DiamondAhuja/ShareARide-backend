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
            "rating": 5,
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

exports.getUserInfo = async (CUID, res) => {
    try {
        //console.log(data);
        var docRef = customerinformationDB.doc(CUID);

        docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    //console.log("Document data:", doc.data());
                    //console.log(doc.data().friendList);
                    console.log("Succcess retrieving user info");
                    return res.status(201).json(doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    return res.status(500).json({ general: "Something went wrong, please try again" });
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
    } catch (error) {
        console.log("Something went wrong, please try again", error);
    }
};