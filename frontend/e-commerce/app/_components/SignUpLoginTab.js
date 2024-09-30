"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "./Loading";
import { useUser } from "../_contexts/userContext";
import { toast } from "sonner";
export default function SignUpLoginTab() {
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    passwordConfirm: "",
    mobileNumber: "",
    email: "",
    address: "",
    loginEmail: "",
    loginPassword: "",
    forgetEmail: "",
    userType: "customer",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const clearStates = () => {
    setFormData({
      name: "",
      password: "",
      passwordConfirm: "",
      mobileNumber: "",
      email: "",
      address: "",
      loginEmail: "",
      loginPassword: "",
      forgetEmail: "",
      userType: "customer",
    });
    setFormErrors({});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";

    if (formData.password !== formData.passwordConfirm)
      errors.passwordConfirm = "Passwords do not match";
    if (!formData.passwordConfirm)
      errors.passwordConfirm = "Confirm password is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.mobileNumber)
      errors.mobileNumber = "Mobile number is required";
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API}/users/signup`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
          email: formData.email,
          address: formData.address,
          mobileNumber: formData.mobileNumber,
        }),
        credentials: "include", // ensure cookies are received
      });

      if (!response.ok) {
        // Attempt to parse the error response
        const errorData = await response.json();
        // You can throw the error data to be handled in the catch block
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      console.log("Sign Up successful:", data.data.user);
      setUser(data.data.user);
      localStorage.setItem("isLoggedIn",true)
      toast.success("Sign Up sucessful, You're now logged in");

      // Handle success, e.g., navigate to a different page or show a success message
    } catch (error) {
      if (error.message.includes("Duplicate field value")) {
        errors.email = "Email already registered";
        setFormErrors(errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setIsLoading(true);

    const errors = {};
    if (!formData.loginEmail) errors.loginEmail = "Email is required";
    if (!formData.loginPassword) errors.loginPassword = "Password is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API}/users/login`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.loginEmail,
          password: formData.loginPassword,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();
      setUser(data.data.user);
      localStorage.setItem("isLoggedIn",true)
      toast.success("Logged in sucessfully");
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("Incorrect")) {
        errors.credentialsError = "Incorrect email or password";
        setFormErrors(errors);
      } else {
        error.credentialsError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgetPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errors = {};

    if (!formData.forgetEmail) {
      errors.forgetEmail = "Email is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API}/users/forgetPassword`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.forgetEmail }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
      setFormErrors({});
      document.getElementById("my_modal_2").close();
      //just a hack to hide modal
      toast.success("Email sent sucessfully");
    } catch (error) {
      errors.forgetError = "This email isn't associated with any user";
      setFormErrors(errors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-base-100 ">
      <Tabs defaultValue="login" className="" onValueChange={clearStates}>
        <TabsList>
          <TabsTrigger value="signup" disabled={isLoading}>
            Sign Up
          </TabsTrigger>
          <TabsTrigger value="login" disabled={isLoading}>
            Login
          </TabsTrigger>
          <TabsTrigger value="forget" disabled={isLoading}>
            Forget Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <form
            onSubmit={handleSignUpSubmit}
            className="flex flex-col justify-center items-center"
          >
            <label htmlFor="name" className="mb-2">
              <div className="label">
                <span className="label-text text-md">What is your name?</span>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={`input input-bordered input-sm max-w-[13rem] block ${
                  formErrors.name ? "input-error" : ""
                }`}
                autoComplete="name"
              />
              {formErrors.name && (
                <p className="text-error text-xs mt-1 ml-2">
                  {formErrors.name}
                </p>
              )}
            </label>

            <label htmlFor="email" className="mb-2">
              <div className="label">
                <span className="label-text text-md">What is your email?</span>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`input input-bordered input-sm max-w-[13rem] block ${
                  formErrors.email ? "input-error" : ""
                }`}
                autoComplete="email"
              />
              {formErrors.email && (
                <p className="text-error text-xs mt-1 ml-2">
                  {formErrors.email}
                </p>
              )}
            </label>

            <label htmlFor="password" className="mb-2">
              <div className="label">
                <span className="label-text text-md">
                  Type your account password
                </span>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
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

            <label htmlFor="passwordConfirm" className="mb-2">
              <div className="label">
                <span className="label-text text-md">
                  Confirm your password
                </span>
              </div>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Confirm Password"
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

            <label htmlFor="address" className="mb-2">
              <div className="label">
                <span className="label-text text-md">
                  What is your address?
                </span>
              </div>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className={`input input-bordered input-sm max-w-[13rem] block ${
                  formErrors.address ? "input-error" : ""
                }`}
                autoComplete="street-address"
              />
              {formErrors.address && (
                <p className="text-error text-xs mt-1 ml-2">
                  {formErrors.address}
                </p>
              )}
            </label>

            <label htmlFor="mobileNumber" className="mb-2">
              <div className="label">
                <span className="label-text text-md">
                  What is your mobile number?
                </span>
              </div>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                className={`input input-bordered input-sm max-w-[13rem] block ${
                  formErrors.mobileNumber ? "input-error" : ""
                }`}
                autoComplete="tel"
              />
              {formErrors.mobileNumber && (
                <p className="text-error text-xs mt-1 ml-2">
                  {formErrors.mobileNumber}
                </p>
              )}
            </label>

            <label htmlFor="role" className="mb-5">
              <div className="label">
                <span className="label-text text-md">Select your role</span>
              </div>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="select select-bordered select-sm w-[13rem] block"
                autoComplete="off"
              >
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
              </select>
            </label>

            <button type="submit" className="btn btn-sm btn-outline">
              {isLoading ? <Loading /> : "Sign Up"}
            </button>
          </form>
        </TabsContent>

        <TabsContent value="login">
          <form
            onSubmit={handleLoginSubmit}
            className="flex flex-col justify-center items-center"
          >
            <label htmlFor="loginEmail" className="mb-2">
              <div className="label">
                <span className="label-text text-md">Enter your email</span>
              </div>
              <input
                type="email"
                id="loginEmail"
                name="loginEmail"
                placeholder="Email"
                value={formData.loginEmail}
                onChange={handleChange}
                className={`input input-bordered input-sm max-w-[13rem] block ${
                  formErrors.loginEmail ? "input-error" : ""
                }`}
                autoComplete="email"
              />
              {formErrors.loginEmail && (
                <p className="text-error text-xs mt-1 ml-2">
                  {formErrors.loginEmail}
                </p>
              )}
            </label>

            <label htmlFor="loginPassword" className="mb-5">
              <div className="label">
                <span className="label-text text-md">Enter your password</span>
              </div>
              <input
                type="password"
                id="loginPassword"
                name="loginPassword"
                placeholder="Password"
                value={formData.loginPassword}
                onChange={handleChange}
                className={`input input-bordered input-sm max-w-[13rem] block ${
                  formErrors.loginPassword ? "input-error" : ""
                }`}
                autoComplete="current-password"
              />
              {formErrors.loginPassword && (
                <p className="text-error text-xs mt-1 ml-2">
                  {formErrors.loginPassword}
                </p>
              )}
            </label>
            <p className="text-error text-md mb-4">
              {formErrors.credentialsError}
            </p>

            <button type="submit" className="btn btn-sm btn-outline">
              {isLoading ? <Loading /> : "Login"}
            </button>
          </form>
        </TabsContent>

        <TabsContent value="forget">
          <form
            onSubmit={handleForgetPasswordSubmit}
            className="flex flex-col justify-center items-center"
          >
            <label htmlFor="forgetEmail" className="mb-2">
              <div className="label">
                <span className="label-text text-md">Enter your email</span>
              </div>
              <input
                type="email"
                id="forgetEmail"
                name="forgetEmail"
                placeholder="Email"
                value={formData.forgetEmail}
                onChange={handleChange}
                className={`input input-bordered input-sm max-w-[13rem] block ${
                  formErrors.forgetEmail ? "input-error" : ""
                }`}
                autoComplete="email"
              />
              {formErrors.forgetEmail && (
                <p className="text-error text-xs mt-1 ml-2">
                  {formErrors.forgetEmail}
                </p>
              )}
            </label>
            <p className="text-error text-md mb-4">{formErrors.forgetError}</p>

            <button type="submit" className="btn btn-sm btn-outline">
              {isLoading ? <Loading /> : "Submit"}
            </button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
