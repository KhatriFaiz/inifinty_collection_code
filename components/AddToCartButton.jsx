"use client";

import { db } from "@/firebase/config";
import { Button } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { UserContext } from "./AuthProvider";
import Link from "next/link";

const AddToCartButton = ({ productId }) => {
  const [displayGoToCart, setDisplayGoToCart] = useState(false);

  const uid = useContext(UserContext)?.uid;
  const cartCollectionRef = collection(db, `users/${uid}/cart`);

  const handleAddToCart = () => {
    // check if the product is already in cart
    const q = query(
      cartCollectionRef,
      where("productRef", "==", doc(db, `products/${productId}`))
    );

    const res = getDocs(q).then((docs) => {
      if (docs.empty) {
        // Add new Document
        const data = {
          productRef: doc(db, `products/${productId}`),
          quantity: 1,
        };

        addDoc(cartCollectionRef, data).catch((err) => console.log(err));

        setDisplayGoToCart(true);
      } else {
        // Update the exisiting document
        docs.forEach((res) => {
          const data = {
            quantity: res.data().quantity + 1,
          };

          const docRef = doc(db, `users/${uid}/cart/${res.id}`);

          setDoc(docRef, data, { merge: true }).catch((err) =>
            console.log(err)
          );
        });

        setDisplayGoToCart(true);
      }
    });
  };

  return displayGoToCart ? (
    <Button fullWidth variant="contained" component={Link} href="/cart">
      Go to Cart
    </Button>
  ) : (
    <Button fullWidth variant="contained" onClick={handleAddToCart}>
      Add to cart
    </Button>
  );
};

export default AddToCartButton;
