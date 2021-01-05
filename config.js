import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyBRCkT-4iZHgLRs72OlFkhd-B2T5QaaT00",
  authDomain: "booksanta-app-9f00a.firebaseapp.com",
  projectId: "booksanta-app-9f00a",
  storageBucket: "booksanta-app-9f00a.appspot.com",
  messagingSenderId: "14800615497",
  appId: "1:14800615497:web:16ffa286b351137558a798"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
