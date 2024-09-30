"use client";

import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import {useUser} from "@/app/_contexts/userContext"

function ForgetPasswordModal({ token }) {
  const {setUser} = useUser()
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const modal = document.getElementById("forgetModal");

    if (modal) {
      modal.showModal();
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
        }
      };

      modal.addEventListener("keydown", handleKeyDown);
      return () => {
        modal.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Must be at least 8 characters long";
    }

    if (!formData.passwordConfirm) {
      errors.passwordConfirm = "Password confirmation is required";
    } else if (formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);

    const endpoint = `${process.env.NEXT_PUBLIC_API}/users/resetPassword/${token}`;

    try {
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
        }),
        credentials: "include", // This ensures cookies are sent and received
      });
      if (response.ok) {
        const modal = document.getElementById("forgetModal");
        modal.close();
        router.push("/");
        localStorage.setItem("isLoggedIn",true)
        toast.success("Password reset sucessful, you're now logged in");
        const data = await response.json()
        setUser(data.data.user)
      } else {
        const data = await response.json();
        setFormErrors({ formError: data.message || "Something went wrong" });
      }
    } catch (error) {
      console.error(error);
      setFormErrors({ formError: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <dialog id="forgetModal" className="modal modal-bottom lg:modal-middle">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center modal-box !rounded-sm"
        >
          <label htmlFor="password" className="mb-2">
            <div className="label">
              <span className="label-text text-md">New Password</span>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className={`input input-bordered input-sm max-w-[13rem] block ${
                formErrors.password ? "input-error" : ""
              }`}
              autoComplete="new-password"
            />
            {formErrors.password && (
              <p className="text-error text-xs mt-1 ml-2">
                {formErrors.password}
              </p>
            )}
          </label>

          <label htmlFor="passwordConfirm" className="mb-5">
            <div className="label">
              <span className="label-text text-md">Confirm New Password</span>
            </div>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Confirm New Password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className={`input input-bordered input-sm max-w-[13rem] block ${
                formErrors.passwordConfirm ? "input-error" : ""
              }`}
              autoComplete="new-password"
            />
            {formErrors.passwordConfirm && (
              <p className="text-error text-xs mt-1 ml-2">
                {formErrors.passwordConfirm}
              </p>
            )}
          </label>

          <p className="text-error text-md mb-4">{formErrors.formError}</p>

          <button type="submit" className="btn btn-sm btn-outline">
            {isLoading ? <span>Loading...</span> : "Reset Password"}
          </button>
        </form>
        <div className="modal-backdrop" />
      </dialog>
    </div>
  );
}

export default ForgetPasswordModal;
