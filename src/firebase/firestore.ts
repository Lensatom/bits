import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { FirebaseApp } from "./init";

const db = getFirestore(FirebaseApp);

// Add new data
export const AddData = async (colRef:string, docRef:string, data:any) => {
  await setDoc(doc(db, colRef, docRef), data);
  return true
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