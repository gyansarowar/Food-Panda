import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useFood } from "../components/FoodContext";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDocRef, setUserDocRef] = useState(null);

  const { selectedFood, removeAllSelectedFood } = useFood();

  // const signInUserWithPhoneNumber = (formatPh, appVerifier) =>
  //   signInWithPhoneNumber(auth, formatPh, appVerifier);

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    await handleUser(result.user);
  };

  const handleUserDocRef = (docRef) => setUserDocRef(docRef);
  // useEffect((docRef) => setUserDocRef(docRef), [userDocRef]);

  useEffect(() => {
    const savedUserDocRef = sessionStorage.getItem("userDocRef");
    if (savedUserDocRef) {
      setUserDocRef(JSON.parse(savedUserDocRef));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("userDocRef", JSON.stringify(userDocRef));
  }, [userDocRef]);

  const handleUser = async (userData) => {
    const collectionRef = collection(database, "users");
    const q = query(collectionRef, where("email", "==", userData.email));
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);

    if (querySnapshot.empty) {
      const docRef = await addDoc(collectionRef, {
        email: userData.email,
        photoURL: userData.photoURL,
        userID: userData.uid,
        userName: userData.displayName,
      });
      handleUserDocRef(docRef.id);
    } else {
      const docSnapShot = querySnapshot.docs[0];
      handleUserDocRef(docSnapShot.id);
    }
  };

  const formatOrderTime = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const placeOrder = async () => {
    const collectionRef = collection(database, "users", userDocRef, "orders");
    // console.log("userDocRef", userDocRef);
    const resultObject = await addDoc(collectionRef, {
      userID: user.uid,
      orderDetails: selectedFood,
      orderTime: formatOrderTime(Date.now()),
    });
    return resultObject;
  };

  const fetchOrders = async () => {
    const collectionRef = collection(database, "users", userDocRef, "orders");
    const result = await getDocs(collectionRef);
    return result;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const isLoggedIn = user !== null ? true : false;
  const LogOut = () => {
    removeAllSelectedFood();
    return signOut(auth);
  };

  return (
    <FirebaseContext.Provider
      value={{
        LogOut,
        handleUser,
        // signInUserWithPhoneNumber,
        signInWithGoogle,
        placeOrder,
        fetchOrders,
        isLoggedIn,
        auth,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
