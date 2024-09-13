import { initializeApp } from 'firebase/app'
import { getFirestore, getDoc, getDocs, DocumentData, DocumentSnapshot, DocumentReference, CollectionReference } from 'firebase/firestore'
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
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseDB = getFirestore(firebaseApp)
// if (isClientSide()) firebase.analytics()

// Helpers
export type FirestoreDoc = DocumentData
// export interface FirestoreDoc {
//   id: string
//   [key: string]: any
// }

export const docWithId = (doc: DocumentSnapshot): FirestoreDoc => ({
  id: doc.id,
  ...doc.data()
})

export const getDocumentItem = async (docRef: DocumentReference): Promise<FirestoreDoc> => {
  const docSnapshot = await getDoc(docRef)
  return docWithId(docSnapshot)
}

export const getCollectionItems = async (collectionRef: CollectionReference): Promise<FirestoreDoc[]> => {
  const querySnapshot = await getDocs(collectionRef)
  const snapshots: FirestoreDoc[] = []
  querySnapshot.forEach((doc) => {
    snapshots.push(docWithId(doc))
  })
  return snapshots
}

// To avoid “cannot be serialized as JSON” error
export const convertDates = (doc: FirestoreDoc): FirestoreDoc => ({
  ...doc,
  dateCreated: doc.dateCreated?.toDate().toString() ?? null,
  dateUpdated: doc.dateUpdated?.toDate().toString() ?? null
})
