// UserContext.js
"use client"; // Make sure this is present

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkCookiesAndFetchUserData = async () => {
      try {
        const jwt = Cookies.get("jwt");

        if (jwt) {
          const response = await fetch("/api/userData", {
            headers: { Authorization: `Bearer ${jwt}` },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error("Failed to fetch user data");
          }
        }
      } catch (error) {
        console.error("Error checking cookies and fetching user data:", error);
      }
    };

    checkCookiesAndFetchUserData();
  }, []);

  const signIn = async (credentials) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        Cookies.set("jwt", data.token, { expires: 7 });
      } else {
        console.error("Failed to sign in");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOut = () => {
    setUserData(null);
    Cookies.remove("jwt");
  };

  const signUp = async (credentials) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        console.log("Sign-up successful");
      } else {
        console.error("Failed to sign up");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, signIn, signOut, signUp }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);
