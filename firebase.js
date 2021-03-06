// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAK2ubN8swFz04mS5jLB3UVzpW66_qJZwk',
  authDomain: 'fakeorfact-e8026.firebaseapp.com',
  projectId: 'fakeorfact-e8026',
  storageBucket: 'fakeorfact-e8026.appspot.com',
  messagingSenderId: '665869750827',
  appId: '1:665869750827:web:a9306d742bd7224a8d506e',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider()
const storage = getStorage()

export { db, auth, provider, storage }
