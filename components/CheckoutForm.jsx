"use client";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./AuthProvider";
import useGetCartProducts from "@/app/_lib/useGetCartProducts";
import CartProductCard from "./Cart/CartProductCard";
import OrderDetails from "./Cart/OrderDetails";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/navigation";

const calculateTotal = (products) => {
  let subTotal = 0;
  products.map((item) => {
    subTotal +=
      `discountPrice` in item
        ? item.discountPrice * item.quantity
        : item.price * item.quantity;
  });
  return subTotal;
};

const CheckoutForm = () => {
  const router = useRouter();
  const uid = useContext(UserContext)?.uid;
  const getProductsFunc = useGetCartProducts;

  const textFeildProps = {
    variant: "outlined",
    size: "small",
    required: true,
    fullWidth: true,
  };

  const [data, setData] = useState({
    address: {
      name: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    paymentMethod: "Card Payment",
    items: [],
    amount: 0,
  });
  const [error, setError] = useState({});

  useEffect(() => {
    if (uid) {
      getProductsFunc(uid).then((res) => {
        setData((prev) => ({
          ...prev,
          items: [...res],
          amount: calculateTotal([...res]),
        }));
      });
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
      getProductsFunc(uid).then((res) => {
        setData((prev) => ({
          ...prev,
          items: [...res],
          amount: calculateTotal([...res]),
        }));
      });
    });
  };

  const handleRemove = (cartItemDocId) => {
    deleteDoc(doc(db, `users/${uid}/cart/${cartItemDocId}`)).catch((err) =>
      console.log(err)
    );
    getProductsFunc(uid).then((res) => {
      setData((prev) => ({
        ...prev,
        items: [...res],
        amount: calculateTotal([...res]),
      }));
    });
  };

  const handlePaymentMethodChange = (method) => {
    setData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handlePlaceOrder = () => {
    let hasError = false;

    Object.entries(data.address).forEach((item) => {
      if (item[1] === "") {
        setError((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            [item[0]]: { type: "required", message: "This field is required." },
          },
        }));
        hasError = true;
      }
    });

    if (hasError) {
      console.log("Error occured!!");
      return;
    }

    addDoc(collection(db, "orders"), {
      ...data,
      ordered_on: Timestamp.now(),
      user_id: uid,
    })
      .then(() => {
        getDocs(collection(db, `users/${uid}/cart`)).then((res) => {
          res.forEach((item) => {
            deleteDoc(doc(db, item.ref.path));
          });
        });

        router.push("/");
      })
      .catch((e) => console.log(e));
  };

  const handleBlur = (e, attributeName) => {
    if (e.target.value === "") {
      setError((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [attributeName]: {
            type: "required",
            message: "This field is required.",
          },
        },
      }));
    } else if ("address" in error && attributeName in error.address) {
      setError((prev) => {
        const { address, ...rest } = prev;
        const { [attributeName]: current, ...addressRest } = address;

        if (Object.keys(addressRest).length === 0) {
          return { ...rest };
        } else {
          return { ...rest, address: { ...addressRest } };
        }
      });
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <section>
          <Typography
            variant="h6"
            component="h2"
            paddingTop={4}
            gutterBottom
            fontWeight={700}
          >
            Checkout
          </Typography>

          <Grid container spacing={2}>
            <Grid item lg={6}>
              <TextField
                {...textFeildProps}
                label="Name"
                helperText={
                  "address" in error && "name" in error.address
                    ? error.address.name.message
                    : null
                }
                error={"address" in error && "name" in error.address}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, name: e.target.value },
                  }))
                }
                onBlur={(e) => handleBlur(e, "name")}
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                {...textFeildProps}
                label="Phone Number"
                helperText={
                  error.address?.phoneNumber &&
                  error.address.phoneNumber.message
                }
                error={"address" in error && "phoneNumber" in error?.address}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, phoneNumber: e.target.value },
                  }))
                }
                onBlur={(e) => handleBlur(e, "phoneNumber")}
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                {...textFeildProps}
                label="Address"
                helperText={
                  error.address?.address && error.address.address.message
                }
                error={"address" in error && "address" in error?.address}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, address: e.target.value },
                  }))
                }
                onBlur={(e) => handleBlur(e, "address")}
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                {...textFeildProps}
                label="City / Town"
                helperText={error.address?.city && error.address.city.message}
                error={"address" in error && "city" in error?.address}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, city: e.target.value },
                  }))
                }
                onBlur={(e) => handleBlur(e, "city")}
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                {...textFeildProps}
                label="State"
                helperText={error.address?.state && error.address.state.message}
                error={"address" in error && "state" in error?.address}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, state: e.target.value },
                  }))
                }
                onBlur={(e) => handleBlur(e, "state")}
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                {...textFeildProps}
                label="Country"
                helperText={
                  error.address?.country && error.address.country.message
                }
                error={"address" in error && "country" in error?.address}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, country: e.target.value },
                  }))
                }
                onBlur={(e) => handleBlur(e, "country")}
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                {...textFeildProps}
                label="Pin Code"
                helperText={
                  error.address?.pincode && error.address.pincode.message
                }
                error={"address" in error && "pincode" in error?.address}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, pincode: e.target.value },
                  }))
                }
                onBlur={(e) => handleBlur(e, "pincode")}
              />
            </Grid>
          </Grid>
        </section>
        <section>
          <Typography
            variant="h6"
            component="h2"
            paddingTop={4}
            gutterBottom
            fontWeight={700}
          >
            Payment Method
          </Typography>
          <FormControl fullWidth>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={data.paymentMethod}
              name="payment-method"
            >
              <Stack direction="column" spacing={2}>
                <Box
                  sx={{
                    border: "1px solid #898989",
                    paddingInline: 3,
                    borderRadius: 2,
                    width: "100%",
                  }}
                  onClick={() => handlePaymentMethodChange("Card Payment")}
                >
                  <FormControlLabel
                    value="Card Payment"
                    control={<Radio />}
                    label="Debit or credit Card"
                  />
                </Box>
                <Box
                  sx={{
                    border: "1px solid #898989",
                    paddingInline: 3,
                    borderRadius: 2,
                    width: "100%",
                  }}
                  onClick={() => handlePaymentMethodChange("UPI Payment")}
                >
                  <FormControlLabel
                    value="UPI Payment"
                    control={<Radio />}
                    label="UPI"
                  />
                </Box>
                <Box
                  sx={{
                    border: "1px solid #898989",
                    paddingInline: 3,
                    borderRadius: 2,
                    width: "100%",
                  }}
                  onClick={() => handlePaymentMethodChange("Cash on delivery")}
                >
                  <FormControlLabel
                    value="Cash on delivery"
                    control={<Radio />}
                    label="Cash On Delivery"
                  />
                </Box>
              </Stack>
            </RadioGroup>
          </FormControl>
        </section>
        <section>
          <Typography
            variant="h6"
            component="h2"
            paddingTop={4}
            gutterBottom
            fontWeight={700}
          >
            Items
          </Typography>
          <Box sx={{ border: "1px solid #eee" }}>
            {data.items.length != 0 &&
              data.items.map((item, index) => (
                <CartProductCard
                  product={item}
                  key={index}
                  uid={uid}
                  handleRemove={handleRemove}
                  handleUpdate={handleUpdate}
                />
              ))}
            {data.items.length == 0 && "No products in cart"}
          </Box>
        </section>
      </Grid>
      <Grid item xs={12} md={4}>
        {data.items.length != 0 && (
          <>
            <OrderDetails total={data.amount} />
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
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </Box>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default CheckoutForm;
