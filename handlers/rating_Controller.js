const { db } = require("../util/admin");
const { firebase } = require("../util/firebase");
const { admin } = require("../util/admin");

// this function will create a document for the user with the parameters defined
const customerinformationDB = db.collection('CustomerInformationDB');

// need to fix this function
exports.rateUser = async (data, res) => {
    try {
        //console.log(data);
        var docRef = customerinformationDB.doc(data.CUID);
        var customer_rating, num_ratings;
        var docdata;
        docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Succcess retrieving user info");
                    customer_rating = doc.data().rating;
                    num_ratings = doc.data().num_ratings;
                    docdata = doc.data();
                } else {
                    console.log("No such document!");
                    return res.status(500).json({ general: "Something went wrong, please try again" });
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

        var updated_rating = (data.rating + customer_rating) / num_ratings;

        console.log(docdata, data.rating, data.updated_rating, data.customer_rating);

        console.log(typeof docdata);

        db.collection("CustomerInformationDB").doc(data.CUID).update({

            "rating": updated_rating,
            "num_ratings": num_ratings + 1

        })
            .then((docRef) => {
                console.log("Rating updated");
            })
            .catch((error) => {
                console.error("Error updating the customer's rating: ", error);
            });
    } catch (error) {
        console.log("Something went wrong, please try again", error);
    }
};
