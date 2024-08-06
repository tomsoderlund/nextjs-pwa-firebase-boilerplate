import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// import 'firebase/analytics'

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: '454142492082',
  appId: '1:454142492082:web:9f097c0b9039832ca7b8ab'
}

// Initialize Firebase
export const firebaseApp = (firebase.apps.length === 0) ? firebase.initializeApp(firebaseConfig) : firebase.app()
export const firebaseDB = firebaseApp.firestore()
// if (isClientSide()) firebase.analytics()

// Helpers
export type FirestoreDoc = firebase.firestore.DocumentData
// export interface FirestoreDoc {
//   id: string
//   [key: string]: any
// }

export const docWithId = (doc: firebase.firestore.DocumentSnapshot): FirestoreDoc => ({
  id: doc.id,
  ...doc.data()
})

export const getDocumentItem = async (docRef: firebase.firestore.DocumentReference): Promise<FirestoreDoc> => {
  const docSnapshot = await docRef.get()
  return docWithId(docSnapshot)
}

export const getCollectionItems = async (collectionRef: firebase.firestore.CollectionReference): Promise<FirestoreDoc[]> => {
  const collectionSnapshots = await collectionRef.get()
  const snapshots: FirestoreDoc[] = []
  collectionSnapshots.forEach((snapshot) => {
    snapshots.push(docWithId(snapshot))
  })
  return snapshots
}

// To avoid “cannot be serialized as JSON” error
export const convertDates = (doc: FirestoreDoc): FirestoreDoc => ({
  ...doc,
  dateCreated: doc.dateCreated?.toDate().toString() ?? null,
  dateUpdated: doc.dateUpdated?.toDate().toString() ?? null
})
