"use client";

import { TextField } from "@mui/material";
import styles from "./styles.module.css";
import { auth, db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { UserContext } from "../AuthProvider";

const AddressFrom = ({ setFormIsVisibal }) => {
  const [formData, setFormData] = useState({});
  const { uid } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uid = auth.currentUser.uid;

    addDoc(collection(db, "users", uid, "addresses"), { ...formData })
      .then(() => {
        setFormIsVisibal(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={styles.addressFromContainer}>
      <form>
        <div className={styles.form}>
          <TextField
            variant="outlined"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            label="Name"
          />
          <TextField
            variant="outlined"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mobileNumber: e.target.value }))
            }
            required
            label="Mobile Number"
          />
          <TextField
            variant="outlined"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            required
            label="Address"
          />
          <TextField
            variant="outlined"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, landmark: e.target.value }))
            }
            label="Landmark"
          />
          <TextField
            variant="outlined"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
            required
            label="Town / city"
          />
          <TextField
            variant="outlined"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, state: e.target.value }))
            }
            required
            label="State"
          />
          <TextField
            variant="outlined"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, country: e.target.value }))
            }
            required
            label="Country"
          />
          <TextField
            variant="outlined"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, pincode: e.target.value }))
            }
            required
            label="Pincode"
          />
          <button className={styles.submitBtn} onClick={(e) => handleSubmit(e)}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressFrom;
