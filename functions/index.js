/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
// Import the necessary modules from the Firebase SDK
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Import the Google Cloud BigQuery client library
const {BigQuery} = require("@google-cloud/bigquery");

// Initialize the Firebase Admin SDK and BigQuery
admin.initializeApp();
const db = admin.firestore();
const bigquery = new BigQuery();

/**
 * Triggered Cloud Function that runs whenever a new user is created
 * in Firebase Authentication.
 */
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  // A good practice to log the start of the function execution
  functions.logger.log("Setting up new user:", user.uid);

  // --- Step 1: Create a user document in Firestore ---
  const userRef = db.collection("users").doc(user.uid);
  try {
    await userRef.set({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    functions.logger.log(`Successfully created Firestore doc for user: ${user.uid}`);
  } catch (error) {
    functions.logger.error(`Error creating Firestore doc for user: ${user.uid}`, error);
    // Exit the function if we can't create the user document
    return;
  }

  // --- Step 2: Create a new BigQuery Dataset for the user ---
  // We use a unique, predictable name for the dataset, e.g., "user_aBcDeF12345"
  const datasetId = `user_${user.uid.replace(/-/g, "_")}`;

  try {
    await bigquery.createDataset(datasetId, {
        location: "US", // Or your preferred location
        description: `Dataset for user ${user.uid}`,
    });
    functions.logger.log(`Successfully created BigQuery dataset: ${datasetId}`);
  } catch (error) {
    functions.logger.error(`Error creating BigQuery dataset for ${user.uid}:`, error);
    // You might want to add cleanup logic here, e.g., delete the Firestore user doc
  }
});
// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
