import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "./config";
import axios from "axios";

//initialize firebaseConfig
const firebaseApp = firebase.initializeApp(firebaseConfig);

//firebase database
const DB = firebaseApp.firestore();

//firebase auth
const auth = firebaseApp.auth();

//firebase google auth provider
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

//creating function to load ip address from the API
const geoApiLink = "https://geolocation-db.com/json/";
const getUserLocationFn = async () => {
  const res = await axios.get(geoApiLink);
  return res.data
};

//handle user profile
const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return;

  const { uid } = userAuth;

  const userRef = DB.doc(`users/${uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { username, displayName, fullName, email } = userAuth;
    const createdAt = new Date();
    const localtionDetails = getUserLocationFn();
    try {
      await userRef.set({
        username: username || "",
        fullName: fullName || displayName || "",
        email,
        userRoles: ["user"],
        createdAt,
        userId: uid,
        ipAddress: localtionDetails.IPv4,
        location: localtionDetails.country_name,
        ...additionalData,
      });
    } catch (err) {
      console.log("Error creating user", err.message);
    }
  }
  return userRef;
};

//get current user
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

//export firebase utils
export { auth, googleAuthProvider, handleUserProfile, getCurrentUser };
export default DB;
