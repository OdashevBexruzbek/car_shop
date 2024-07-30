// firebase
import {
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// react hooks
import { useEffect, useState } from "react";

export const useCollection = (collectionName, whereOptions, orderOptions) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      where(...whereOptions),
      orderBy(...orderOptions)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const recipes = [];
      querySnapshot.forEach((doc) => {
        recipes.push({ id: doc.id, ...doc.data() });
      });
      setData(recipes);
    });

    return () => unsubscribe();
  }, [collectionName, whereOptions]);

  return { data };
};
