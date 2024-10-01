"use client";
import { useUser } from "../_contexts/userContext";
import { useState } from "react"; // Corrected import for useState
import Loading from "./Loading";
import {toast } from "sonner";
import {useCart} from "../_contexts/cartContext"
export default function LogoutButton() {
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Logged out successfully");
        localStorage.removeItem("isLoggedIn")
        setUser(null);
        toast.success("Logged out sucessfully")
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-outline btn-sm ml-3">
      {isLoading ? <Loading /> : "Logout"}
    </button>
  );
}
