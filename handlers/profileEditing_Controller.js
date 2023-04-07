const { db } = require("../util/admin");
const { firebase } = require("../util/firebase");
const { admin } = require("../util/admin");

// this function will create a document for the user with the parameters defined
const customerinformationDB = db.collection('CustomerInformationDB');

// need to fix this function
exports.editUserProfile = async (data, res) => {
    try {
        //console.log(data);
        db.collection("CustomerInformationDB").doc(data.CUID).update({
            "id": data.CUID,
            "firstName": data.firstName,
            "lastName": data.lastName,
            "phoneNumber": data.phoneNumber,
            "address": data.address,
            "DiscordAuthToken": "",
            "DOB": data.DOB,
            "rating": data.rating,
            "friendRequestList": [],
            "friendList": [],
            "sentFriendRequestList": [],
            "email": data.email
        })
            .then((docRef) => {
                console.log("Profile updated");
            })
            .catch((error) => {
                console.error("Error updating profile: ", error);
            });
    } catch (error) {
        console.log("Something went wrong, please try again", error);
    }
};

exports.deleteUser = async (uid, res) => {
    try {
        admin.auth().deleteUser(uid)
            .then(() => {

                customerinformationDB.doc(uid).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
                console.log('Successfully deleted user');
                res.status(201).json({ general: "Successfully deleted user" });
            })
            .catch((error) => {
                console.log('Error deleting user:', error);
            });
    } catch (error) {
        console.log("Something went wrong, please try again", error);
    }
};
