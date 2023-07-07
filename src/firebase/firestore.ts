import { getFirestore, doc, setDoc, getDoc, addDoc, collection, updateDoc, where, query } from "firebase/firestore";
import { FirebaseApp } from "./init";

const db = getFirestore(FirebaseApp);

// Add new data
export const  AddData = async (colRef:string, docRef:string | null, data:any) => {
  let res;
  if (docRef === null) {
    res = await addDoc(collection(db, colRef), data)
  } else {
    res = await setDoc(doc(db, colRef, docRef), data);
  }
  return res?.id
}

export const GetData = async (colRef:string, docRef:string) => {
  const dbRef= doc(db, colRef, docRef);
  const docSnap = await getDoc(dbRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null
  }
}

export const UpdateData = async (colRef:string, docRef:any, data:any) => {
  await updateDoc(doc(db, colRef, docRef), data);
  return true;
}

export const GetRoom = async (title:string, passcode:string | null) => {
  if (passcode === null) {
    const hostId = title;
    const roomsRef = collection(db, "hosting");
    const q = query(roomsRef, where("hostId", "==", hostId));
    return q
  } else {
    const roomsRef = collection(db, "hosting");
    const q = query(roomsRef, where("title", "==", title), where("passcode", "==", passcode));
    return q
  }
}

export const CheckIfUsernameIsInUse = async (username:string) => {
  const roomsRef = collection(db, "users");
  const q = query(roomsRef, where("username", "==", username));
  return q
}