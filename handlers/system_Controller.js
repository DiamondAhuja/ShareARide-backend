const { db } = require("../util/admin");

// this function will create a document for the user with the parameters defined
const taxiinformationDB = db.collection('TaxiInformationDB');

exports.validateTaxiInfo = async (qrcode, res) => {
    try{
        //console.log(data);
        var docRef = taxiinformationDB.doc(qrcode);

        docRef.get()
        .then((doc) => {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                //console.log(doc.data().friendList);
                console.log("Success validating taxi info");
                console.log("taxistatus:", doc.data().status);
                return res.status(201).json({ taxistatus: doc.data().status});
            } else {
                // doc.data() will be undefined in this case
                console.log("No such taxi!");
                return res.status(500).json({ general: "Something went wrong, please try again"});
            }
        }).catch((error) => {
            console.log("Error getting taxi:", error);
        });
    } catch (error) {
        console.log("Something went wrong, please try again", error);
    }
};