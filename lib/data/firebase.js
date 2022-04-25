const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase/auth')
// require('firebase/analytics')

// const isClientSide = require('../isClientSide')


const firebaseConfig = {
  apiKey: "AIzaSyBXUBxdIBp0ae46oSCUFl3V6uRDC20jfcw",
  authDomain: "pwa-nayara.firebaseapp.com",
  projectId: "pwa-nayara",
  storageBucket: "pwa-nayara.appspot.com",
  messagingSenderId: "846901627885",
  appId: "1:846901627885:web:6e40cb3399ece1eca5f5e4"
};

// Initialize Firebase
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const firebaseDB = firebaseApp.firestore()
// if (isClientSide()) firebase.analytics()

// Helpers
const docWithId = (doc) => ({ id: doc.id, ...doc.data() })

const getDocumentItem = async (docRef) => docWithId(await docRef.get())

const getCollectionItems = async (collectionRef) => {
  const collectionSnapshots = await collectionRef.get()
  const snapshots = []
  collectionSnapshots.forEach((snapshot) => {
    snapshots.push(docWithId(snapshot))
  })
  return snapshots
}

// To avoid “cannot be serialized as JSON” error
const convertDates = (doc) => ({
  ...doc,
  dateCreated: doc.dateCreated ? doc.dateCreated.toDate().toString() : null,
  dateUpdated: doc.dateUpdated ? doc.dateUpdated.toDate().toString() : null
})

module.exports = {
  firebase,
  firebaseApp,
  firebaseDB,

  docWithId,
  getDocumentItem,
  getCollectionItems,

  convertDates
}
