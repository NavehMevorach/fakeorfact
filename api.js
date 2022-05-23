import {
  addDoc,
  setDoc,
  getDoc,
  doc,
  collection,
  query,
  where,
  orderBy,
  startAfter,
  limit,
  getDocs,
  serverTimestamp,
} from '@firebase/firestore'
import { async } from '@firebase/util'
import { db } from './firebase'
import { v4 as uuidv4 } from 'uuid'

// Read
export async function getTopUsers() {}

export async function getTopQuestions() {}

export async function getNextPost(last, sortBy = 'desc') {
  try {
    // Query the first page of docs
    console.log(last)
    const postsFirstBatch = query(
      collection(db, 'posts'),
      orderBy('timestamp', sortBy),
      startAfter('be78a348-22fe-42bb-85f1-651c2e4dd661'),
      limit(2)
    )
    const documentSnapshots = await getDocs(postsFirstBatch)
    return [documentSnapshots, last + 1]
  } catch {
    return false
  }
}

export async function getInitialPosts(sortBy = 'desc') {
  try {
    // Query the first page of docs
    const postsFirstBatch = query(
      collection(db, 'posts'),
      orderBy('timestamp', sortBy),
      limit(5)
    )
    const documentSnapshots = await getDocs(postsFirstBatch)

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1]
    return documentSnapshots
  } catch (err) {
    console.log(err)
    return false
  }
}

export async function getPostComments(postId) {}

export async function getUserPosts(userId) {}

export async function getUserBookmarks(userId) {
  const { bookmarks } = await getUser(userId)
  if (bookmarks) {
    const citiesRef = collection(db, 'posts')
    const q = query(citiesRef, where('postId', 'in', bookmarks))
    const querySnapshot = await getDocs(q)
    const posts = []
    querySnapshot.forEach((doc) => {
      posts.push(doc.data())
    })
    return posts
  }
}

export async function getUser(userID) {
  const docRef = doc(db, 'users', userID)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return false
  }
}

// Write
export async function addUser(cred) {
  const user = {
    name: cred.user.displayName,
    joinedAt: serverTimestamp(),
    photoURL: cred.user.photoURL,
    posts: [],
    comments: [],
    bookmarks: [],
  }
  const userID = cred.user.uid
  try {
    const docRef = doc(db, 'users', userID)
    await setDoc(docRef, user)
    return true
  } catch (err) {
    return false
  }
}

export async function addPost(post) {
  try {
    const postId = uuidv4()
    const data = {
      ...post,
      postId,
      comments: [],
      fake: 0,
      fact: 0,
      timestamp: serverTimestamp(),
    }
    const docRef = doc(db, 'posts', postId)
    await setDoc(docRef, data)
    return postId
  } catch (err) {
    console.log(err)
    return false
  }
}

export async function addComment(comment) {
  try {
    const collectionRef = collection(db, 'comments')
    const docRef = await addDoc(collectionRef, {
      ...comment,
      timestamp: serverTimestamp(),
    })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

// Update
export async function updateUserPosts(userID, postID) {
  const user = await getUser(userID)
  if (user) {
    const { posts } = user
    posts.push(postID)
    try {
      const docRef = doc(db, 'users', userID)
      await setDoc(docRef, { posts }, { merge: true })
    } catch {}
  }
}

export async function updateUserBookmarks(userID, postID) {
  const user = await getUser(userID)
  if (user) {
    const { bookmarks } = user
    bookmarks.push(postID)
    try {
      const docRef = doc(db, 'users', userID)
      await setDoc(docRef, { bookmarks }, { merge: true })
    } catch {
      console.log('err with updatig bookmkark')
    }
  }
}

export async function removePostFromUserBookmarks(userID, postID) {
  const user = await getUser(userID)
  if (user) {
    let { bookmarks } = user
    bookmarks = bookmarks.filter((el) => el !== postID)
    try {
      const docRef = doc(db, 'users', userID)
      await setDoc(docRef, { bookmarks }, { merge: true })
    } catch {
      console.log('err with removing a bookmkark')
    }
  }
}

// Helpers
export async function checkIfDocExists(collection, docId) {
  const docRef = doc(db, collection, docId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return true
  } else {
    return false
  }
}
