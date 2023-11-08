"use client";

import { Box, Button, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../AuthProvider";
import useGetCartProducts from "@/app/_lib/useGetCartProducts";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import CartProductCard from "./CartProductCard";
import OrderDetails from "./OrderDetails";
import Link from "next/link";

const Cart = () => {
  const uid = useContext(UserContext)?.uid;
  const [products, setProducts] = useState([]);
  const getProductsFunc = useGetCartProducts;

  useEffect(() => {
    if (uid) {
      getProductsFunc(uid).then((res) => setProducts(res));
    }
  }, [uid]);

  const handleUpdate = (cartItemId, quantity) => {
    setDoc(
      doc(db, `users/${uid}/cart/${cartItemId}`),
      {
        quantity: quantity,
      },
      { merge: true }
    ).then(() => {
      getProductsFunc(uid).then((res) => setProducts(res));
    });
  };

  const handleRemove = (cartItemDocId) => {
    deleteDoc(doc(db, `users/${uid}/cart/${cartItemDocId}`)).catch((err) =>
      console.log(err)
    );
    getProductsFunc(uid).then((res) => setProducts(res));
  };

  const calculateTotal = () => {
    let subTotal = 0;
    products.map((item) => {
      subTotal +=
        `discountPrice` in item
          ? item.discountPrice * item.quantity
          : item.price * item.quantity;
    });
    return subTotal;
  };

  const total = calculateTotal();

  return (
    <Grid container marginY={5} spacing={3}>
      <Grid item xs={12} md={8}>
        <Box>
          {products.length != 0 &&
            products.map((item, index) => (
              <CartProductCard
                product={item}
                key={index}
                uid={uid}
                handleRemove={handleRemove}
                handleUpdate={handleUpdate}
              />
            ))}
          {products.length == 0 && "No products in cart"}
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        {products.length != 0 && (
          <>
            <OrderDetails total={total} />
            <Box
              sx={{ display: "flex", justifyContent: "end", marginBlock: 2 }}
            >
              <Button
                variant="standard"
                size="small"
                sx={{
                  background: "#000",
                  color: "#fff",
                  border: "1px solid #000",
                  "&:hover": { background: "#fff", color: "#000" },
                }}
                component={Link}
                href="/checkout"
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Cart;
