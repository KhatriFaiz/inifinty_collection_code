"use client";

import { useEffect, useState } from "react";
import FormModel from "../Form/FormModel";
import Input from "../Form/Input";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const loginUser = (values, setFormErrorMessage) => {
  signInWithEmailAndPassword(auth, values.email, values.password)
    .then(() => {
      setFormErrorMessage({
        type: "success",
        message: "Login successful. Redirecting...",
      });
    })
    .catch((e) => {
      if (e.code === "auth/invalid-login-credentials") {
        setFormErrorMessage({
          type: "error",
          message: "Incorrect email or password!",
        });
      }
    });
};

const LoginForm = () => {
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
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setFormMessage(null);
      loginUser(values, setFormMessage);
    },
  });

  return (
    <FormModel onSubmit={formik.handleSubmit} formMessage={formMessage}>
      <Input
        type="email"
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        errorMessage={formik.errors.email}
        onBlur={formik.handleBlur}
        fieldTouched={formik.touched.email}
      />
      <Input
        type="password"
        label="Password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fieldTouched={formik.touched.password}
        errorMessage={formik.errors.password}
      />
      <Input type="submit" />
    </FormModel>
  );
};

export default LoginForm;
