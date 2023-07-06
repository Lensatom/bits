import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { FirebaseApp } from "./init";
import { AddData } from "./firestore";

const auth = getAuth(FirebaseApp)

// Get current user
export const GetCurrentUser = () => {
  const response = onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      return uid
    } else {
      return (null)
    }
  })
  return response
}

// Sign up new user
export const SignUp = async (email:string, password:string, username: string) => {
  const response = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user
    })
    .catch((error) => {
      const errorCode = error.code;
      return errorCode
    });
  if (typeof(response) !== "string") {
    const data = {
      uid: response.uid,
      username,
      email,
      avatar: "",
    }
    await AddData("users", response.uid, data)
    return true;
  } else {
    return response;
  }
}

// Sign in an existing user
export const SignIn = async (email:string, password:string) => {
  const response = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      return errorCode;
    });
  return response;
}