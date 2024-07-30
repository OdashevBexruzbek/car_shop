import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      const docRef = doc(db, collection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDocument(docSnap.data());
      }
    };

    fetchDocument();
  }, [collection, id]);

  return { document };
};
