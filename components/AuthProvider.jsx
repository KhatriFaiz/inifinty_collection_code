"use client";

import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState(user);
      } else {
        setUserState(null);
      }
    });
  }, [userState]);

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
