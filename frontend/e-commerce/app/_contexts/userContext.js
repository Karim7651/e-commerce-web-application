'use client'
import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
        console.log("checking user Status")
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_API}/users/auth/status`
        const res = await fetch(endpoint, {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.data.user)
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user status', error);
        setUser(null);
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

// custom hook to use context
export const useUser = () => {
  return useContext(UserContext);
};
