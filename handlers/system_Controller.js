const { db } = require("../util/admin");

// this function will create a document for the user with the parameters defined
const taxiinformationDB = db.collection('TaxiInformationDB');
const customerinformationDB = db.collection('CustomerInformationDB');
const rideinformationDB = db.collection('RideInformationDB');

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

exports.offertempCarpool = async (data, res) => {
    try {
        //console.log(data);
        const rating_ref = customerinformationDB.doc(data.CUID);
        var rating;

        rating_ref.get().then( doc => {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                rating = doc.data().rating;
                var fare = 0;

                rideinformationDB.add({
                    "ridetype": "tempoffer",
                    "taxicode": data.taxi_qr_code,
                    "maxriders": data.maxriders,
                    "offerer": data.CUID,
                    "requesterlist": [],
                    "riders": data.riders,
                    "endlocation": data.end_location,
                    "startlocation": data.start_location,
                    "offererrating": rating,
                    "status": "open",
                    "ETA": data.ETA,
                    "distance": data.distance,
                    "fare": fare,
                    "stops": data.stops,
                })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        return res.status(201).json({ general: "Success", ride_id: docRef.id});
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                        return res.status(500).json({ general: "Something went wrong, please try again" })
                    });

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