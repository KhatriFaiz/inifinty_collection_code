"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const QuantityCounter = ({ quantityCount, handleUpdate, cartItemId }) => {
  const [quantity, setQuantity] = useState(quantityCount);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    !isUpdated && setIsUpdated(true);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      !isUpdated && setIsUpdated(true);
    }
  };

  return (
    <div className={styles.quantity_counter}>
      <button className={styles.counter_button} onClick={handleDecrement}>
        -
      </button>
      <span className={styles.counter_number}>{quantity}</span>
      <button className={styles.counter_button} onClick={handleIncrement}>
        +
      </button>
      {isUpdated && (
        <button
          className={styles.update_button}
          onClick={() => {
            handleUpdate(cartItemId, quantity);
            setIsUpdated(false);
          }}
        >
          Update
        </button>
      )}
    </div>
  );
};

export default QuantityCounter;
