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
            "firstName": data.firstName,
            "lastName": data.lastName,
            "phoneNumber": data.phoneNumber,
            "address": data.address,
            "DiscordAuthToken": data.DiscordAuthToken,
            "email": data.email
        })
            .then((docRef) => {
                console.log("Profile updated");
                res.status(201).json({ message: "Profile updated" });
            })
            .catch((error) => {
                console.error("Error updating profile: ", error);
                return res.status(500).json({ general: "Something went wrong, please try again" });
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
                return res.status(500).json({ general: "Something went wrong, please try again" });
            });
    } catch (error) {
        console.log("Something went wrong, please try again", error);
    }
};
