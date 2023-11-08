"use client";

import { auth, db } from "@/firebase/config";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import AddressCard from "../AddressCard";
import { UserContext } from "../AuthProvider";

const AddressCards = () => {
  let [addresses, setAddresses] = useState(null);
  let uid = useContext(UserContext)?.uid;

  useEffect(() => {
    if (uid) {
      getDocs(collection(db, "users", uid, "addresses")).then((snap) => {
        const temp = [];
        snap.docs.forEach((doc) => {
          temp.push(doc.data());
        });
        setAddresses(temp);
      });
    }
  }, [uid]);

  return (
    <>
      {addresses &&
        addresses.map((item, index) => <AddressCard key={index} data={item} />)}
    </>
  );
};

export default AddressCards;
