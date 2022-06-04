import {
  setDoc,
  getDoc,
  updateDoc,
  doc,
  collection,
  query,
  where,
  orderBy,
  startAfter,
  limit,
  getDocs,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from '@firebase/firestore'
import { db, storage } from './firebase'
import { getDownloadURL, ref, uploadString } from '@firebase/storage'
import { v4 as uuidv4 } from 'uuid'

// --- Read ---
export async function getPost(postID) {
  try {
    const docRef = doc(db, 'posts', postID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return false
    }
  } catch {
    console.log('There was Err fetching the Post')
    return []
  }
}
export async function getInitialPosts(sortBy = 'desc') {
  try {
    // Query the first page of docs
    const postsFirstBatch = query(
      collection(db, 'posts'),
      orderBy('timestamp', sortBy),
      limit(10)
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

export async function getNextPost(last, sortBy = 'desc') {
  try {
    // Query the first page of docs
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

export async function getFiveUsers() {
  try {
    // Query the first page of docs
    const q = query(collection(db, 'users'), orderBy('timestamp'), limit(2))
    const documentSnapshots = await getDocs(q)
    return documentSnapshots
  } catch (err) {
    console.log(err)
    return false
  }
}

export async function getPostComments(postId) {
  try {
    const commentsRef = collection(db, 'comments')
    const q = query(commentsRef, where('postId', '==', postId))
    const querySnapshot = await getDocs(q)
    const comments = []
    querySnapshot.forEach((doc) => {
      comments.push(doc.data())
    })
    comments.sort(function (a, b) {
      // ASC  -> a.length - b.length
      // DESC -> b.length - a.length
      return b.upvote.length - a.upvote.length
    })

    return comments
  } catch {
    console.log('Failed to Fetch Post Comments')
    return []
  }
}

export async function getUserPosts(userId) {
  try {
    const postsRef = collection(db, 'posts')
    const q = query(postsRef, where('uid', '==', userId))
    const querySnapshot = await getDocs(q)
    const posts = []
    querySnapshot.forEach((doc) => {
      posts.push(doc.data())
    })
    return posts
  } catch {
    console.log('Failed to Fetch User Posts')
    return []
  }
}

export async function getUserComments(userId) {
  try {
    const commentsRef = collection(db, 'comments')
    const q = query(commentsRef, where('uid', '==', userId))
    const querySnapshot = await getDocs(q)
    const comments = []
    querySnapshot.forEach((doc) => {
      comments.push(doc.data())
    })
    return comments
  } catch {
    console.log('Failed to Fetch User Comments')
    return []
  }
}

export async function getUserBookmarks(userId) {
  const { bookmarks } = await getUser(userId)
  if (bookmarks.length > 0) {
    const citiesRef = collection(db, 'posts')
    const q = query(citiesRef, where('postId', 'in', bookmarks))
    const querySnapshot = await getDocs(q)
    const posts = []
    querySnapshot.forEach((doc) => {
      posts.push(doc.data())
    })
    return posts
  }
  return []
}

export async function getUser(userID) {
  const docRef = doc(db, 'users', userID)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { ...docSnap.data(), uid: docSnap.id }
  } else {
    return false
  }
}

export async function getComment(commentID) {
  const docRef = doc(db, 'comments', commentID)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { ...docSnap.data(), uid: docSnap.id }
  } else {
    return false
  }
}

// --- Write ---
export async function addUser(cred) {
  const user = {
    name: cred.user.displayName,
    joinedAt: serverTimestamp(),
    photoURL: cred.user.photoURL,
    posts: [],
    comments: [],
    bookmarks: [],
    verified: false,
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
      postId: postId,
    }
    const docRef = doc(db, 'posts', postId)
    await setDoc(docRef, data)
    return postId
  } catch (err) {
    console.log(err)
    return false
  }
}

export async function addImageToPost(postId, file) {
  let downloadUrl
  try {
    const imageRef = ref(storage, `posts/${postId}/image`)
    await uploadString(imageRef, file, 'data_url').then(async () => {
      downloadUrl = await getDownloadURL(imageRef)
      await updateDoc(doc(db, 'posts', postId), {
        postImg: downloadUrl,
      })
    })
    return downloadUrl
  } catch (err) {
    console.log('Err uploading image to storage')
    console.log(err)
  }
}

export async function addComment(comment) {
  try {
    const commentId = uuidv4()
    const data = {
      ...comment,
      commentId,
    }
    const docRef = doc(db, 'comments', commentId)
    await setDoc(docRef, data)
    return commentId
  } catch (err) {
    console.log(err)
    return false
  }
}

export async function voteFake(userID, postID) {
  let { fake, fact } = await getPost(postID)
  const docRef = doc(db, 'posts', postID)
  if (!fake.includes(userID)) {
    try {
      await updateDoc(docRef, {
        fake: arrayUnion(userID),
      })
    } catch {
      console.log('err with adding UserID to Fake array')
    }
  }
  if (fact.includes(userID)) {
    try {
      await updateDoc(docRef, {
        fact: arrayRemove(userID),
      })
    } catch {
      console.log('err with remove UserId from Fact Array')
    }
  }
}

export async function voteFact(userID, postID) {
  let { fake, fact } = await getPost(postID)
  const docRef = doc(db, 'posts', postID)
  if (!fact.includes(userID)) {
    try {
      await updateDoc(docRef, {
        fact: arrayUnion(userID),
      })
    } catch {
      console.log('err with adding UserID to Fact array')
    }
  }
  if (fake.includes(userID)) {
    try {
      await updateDoc(docRef, {
        fake: arrayRemove(userID),
      })
    } catch {
      console.log('err with remove UserId from Fake Array')
    }
  }
}

// --- Update ---
export async function updateUserPosts(userID, postID) {
  const user = await getUser(userID)
  if (user) {
    try {
      const docRef = doc(db, 'users', userID)
      await updateDoc(docRef, {
        posts: arrayUnion(postID),
      })
    } catch {
      console.log('err with update User Posts')
    }
  }
}

export async function updateUserBookmarks(userID, postID) {
  const user = await getUser(userID)
  if (user) {
    try {
      const docRef = doc(db, 'users', userID)
      await updateDoc(docRef, {
        bookmarks: arrayUnion(postID),
      })
    } catch {
      console.log('err with updatig User Bookmkarks')
    }
  }
}

export async function updateUserVerify(userId) {
  try {
    const docRef = doc(db, 'users', userId)
    await updateDoc(docRef, { verified: true })
    return true
  } catch {
    console.log('err with updatig verfied user')
    return false
  }
}

export async function upvoteComment(userId, commentId) {
  try {
    const docRef = doc(db, 'comments', commentId)
    const docData = await getDoc(docRef)
    if (docData.data().downvote.includes(userId)) {
      await updateDoc(docRef, { downvote: arrayRemove(userId) })
    }
    await updateDoc(docRef, { upvote: arrayUnion(userId) })
    return true
  } catch (err) {
    console.log(err)
    console.log('err with updatig comment upvotes ')
    return false
  }
}

export async function downvoteComment(userId, commentId) {
  try {
    const docRef = doc(db, 'comments', commentId)
    const docData = await getDoc(docRef)
    if (docData.data().upvote.includes(userId)) {
      await updateDoc(docRef, { upvote: arrayRemove(userId) })
    }
    await updateDoc(docRef, { downvote: arrayUnion(userId) })
    return true
  } catch {
    console.log('err with updatig comment downvotes')
    return false
  }
}

export async function removePostFromUserBookmarks(userID, postID) {
  const user = await getUser(userID)
  if (user) {
    try {
      const docRef = doc(db, 'users', userID)
      await updateDoc(docRef, { bookmarks: arrayRemove(postID) })
    } catch {
      console.log('err with removing a bookmkark')
    }
  }
}

// --- Helpers ---
export async function checkIfDocExists(collection, docId) {
  const docRef = doc(db, collection, docId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return true
  } else {
    return false
  }
}

export function getFirebaseTimestamp() {
  return serverTimestamp()
}
