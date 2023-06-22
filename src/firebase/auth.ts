import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { FirebaseApp } from "./init";
import { AddData } from "./firestore";

const auth = getAuth(FirebaseApp)

// Get current user
export const GetCurrentUser = async () => {
  const response = await onAuthStateChanged(auth, (user) => {
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
      return user.uid
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode} ${errorMessage}`)
      return(null)
    });
  if (response !== null) {
    await AddData("users", response, {username})
    return true;
  }
}

// Sign in an existing user
export const SignIn = async (email:string, password:string) => {
  const response = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      return errorCode;
    });
  return response;
}