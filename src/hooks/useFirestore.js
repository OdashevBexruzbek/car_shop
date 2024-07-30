// firestore
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// toast
import toast from "react-hot-toast";

export const useFirestore = () => {
  const deleteItem = async (id) => {
    deleteDoc(doc(db, "recipes", id));
    alert("Are you sure to delete this recipe");
    toast.success("Recipe Deleted");
  };
  const addNewDoc = async (doc) => {
    await addDoc(collection(db, "recipes"), {
      ...doc,
      createdAt: serverTimestamp(),
    });
    toast.success("🎉Great, you just made your own recipe.");
  };

  return { addNewDoc, deleteItem };
};
