  "use client";
  import { createContext, useState, useContext, useEffect } from "react";

  const UserContext = createContext();

  export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // check user login status
    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        return;
      }
      setLoading(true);
      const checkUserStatus = async () => {
        try {
          const endpoint = `${process.env.NEXT_PUBLIC_API}/users/auth/status`;
          const res = await fetch(endpoint, {
            method: "GET",
            credentials: "include",
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data.data.user);
          } else {
            setUser(null);
            localStorage.removeItem("isLoggedIn");
          }
        } catch (error) {
          console.error("Failed to fetch user status", error);
          setUser(null);
          localStorage.removeItem("isLoggedIn");
        } finally {
          setLoading(false);
        }
      };

      checkUserStatus();
    }, []);

    return (
      <UserContext.Provider value={{ user, setUser, loading }}>
        {children}
      </UserContext.Provider>
    );
  };

  // Custom hook to use the context
  export const useUser = () => {
    return useContext(UserContext);
  };
