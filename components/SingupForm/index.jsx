"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import FormModel from "../Form/FormModel";
import Input from "../Form/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, db } from "@/firebase/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(4, "Must be atleast 4 characters long")
    .required("Password is required"),
});

const singupUser = (values, setFormMessage) => {
  createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((res) => {
      // Add user to firestore database

      setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email: res.user.email,
      }).catch((e) => {
        console.log(e);
      });
    })
    .then(() => {
      setFormMessage({
        type: "success",
        message: "Signup successful. Redirecting...",
      });
    })
    .catch((e) => {
      if (e.code === "auth/email-already-in-use") {
        setFormMessage({
          type: "error",
          message: "Email is already in use. Please login.",
        });
      } else {
        setFormMessage({
          type: "error",
          message: "Something went wrong. Try again.",
        });
      }
    });
};

const SignupForm = () => {
  const [formMessage, setFormMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (formMessage && formMessage.type === "success") router.push("/");
  }, [formMessage]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      setFormMessage(null);
      singupUser(values, setFormMessage);
    },
  });

  return (
    <FormModel onSubmit={formik.handleSubmit} formMessage={formMessage}>
      <Input
        label="Email"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        errorMessage={formik.errors.email}
        onBlur={formik.handleBlur}
        fieldTouched={formik.touched.email}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        errorMessage={formik.errors.password}
        onBlur={formik.handleBlur}
        fieldTouched={formik.touched.password}
      />
      <Input type="submit" />
    </FormModel>
  );
};

export default SignupForm;
