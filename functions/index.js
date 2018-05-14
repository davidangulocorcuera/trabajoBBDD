const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');
admin.initializeApp();

exports.HashingUsername = functions.firestore
  .document('perfiles/{userId}')
  .onCreate((snap, context) => {
    let data = snap.data();
    let hash = crypto.createHash('md5').update(data.nombreUsuario).digest("hex");
    return snap.ref.set({ hash }, {merge: true});
});
