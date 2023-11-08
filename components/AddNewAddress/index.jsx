"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import AddressFrom from "./AddressFrom";

const AddNewAddress = () => {
  const [formIsVisibal, setFormIsVisibal] = useState(false);

  return formIsVisibal ? (
    <AddressFrom setFormIsVisibal={setFormIsVisibal} />
  ) : (
    <button
      className={styles.addAddressBtn}
      onClick={() => setFormIsVisibal(true)}
    >
      Add New Address
    </button>
  );
};

export default AddNewAddress;
