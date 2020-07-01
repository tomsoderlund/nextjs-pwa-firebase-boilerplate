const firebase = require('firebase/app')
require('firebase/firestore')
// require('firebase/analytics')
// require('firebase/auth')

// const isClientSide = require('./isClientSide')

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'tom-development-boilerplate.firebaseapp.com',
  databaseURL: 'https://tom-development-boilerplate.firebaseio.com',
  projectId: 'tom-development-boilerplate',
  storageBucket: 'tom-development-boilerplate.appspot.com',
  messagingSenderId: '454142492082',
  appId: '1:454142492082:web:9f097c0b9039832ca7b8ab'
}

// Initialize Firebase
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
// if (isClientSide()) firebase.analytics()

// Helpers
const docWithId = (doc) => ({ ...doc.data(), id: doc.id })

const getCollection = async (collectionRef) => {
  const docsSnapshot = await collectionRef.get()
  const docs = []
  docsSnapshot.forEach((doc) => {
    docs.push(docWithId(doc))
  })
  return docs
}

module.exports = {
  firebaseApp,
  firebaseDB: firebaseApp.firestore(),

  docWithId,
  getCollection
}
