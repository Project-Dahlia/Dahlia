"use strict";

const admin = require("firebase-admin");
// const serviceKey = require('./serviceKey.json'); // need fb service key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const settings = {
  timestampsInSnapshots: true,
};
firestore.settings(settings);

module.exports = { admin, firestore };
