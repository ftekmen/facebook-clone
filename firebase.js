import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA0oinUx_fCLcayUvzBlPrY-QMer9uKbM4",
  authDomain: "facebook-clone-68747.firebaseapp.com",
  projectId: "facebook-clone-68747",
  storageBucket: "facebook-clone-68747.appspot.com",
  messagingSenderId: "905473628868",
  appId: "1:905473628868:web:ed3a369c091f5f86410791"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, ref, uploadString, getDownloadURL };