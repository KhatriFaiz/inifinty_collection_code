"use client";

import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import OrderCard from "../OrderCard";
import { UserContext } from "../AuthProvider";
import { db } from "@/firebase/config";

const Orders = () => {
  const uid = useContext(UserContext)?.uid;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (uid) {
      let temp = [];
      const q = query(collection(db, "orders"), where("user_id", "==", uid));

      getDocs(q).then((res) => {
        res.forEach((item) => {
          temp = [
            ...temp,
            {
              ...item.data(),
              date: item.data().ordered_on.toDate().toLocaleString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            },
          ];
        });

        setOrders([...temp]);
      });
    }
  }, [uid]);

  return orders.length > 0
    ? orders.map((item, index) => (
        <OrderCard
          date={item.date}
          items={item.items}
          amount={item.amount}
          key={index}
        />
      ))
    : "No orders placed";
};

export default Orders;
