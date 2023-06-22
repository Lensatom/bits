import { getFirestore, doc, setDoc } from "firebase/firestore";
import { FirebaseApp } from "./init";

const db = getFirestore(FirebaseApp);

// Add new data
export const AddData = async (colRef:string, docRef:string, data:any) => {
  await setDoc(doc(db, colRef, docRef), data);
  return true
}