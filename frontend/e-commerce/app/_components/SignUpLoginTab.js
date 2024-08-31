"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "./Loading";

export default function SignUpLoginTab() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    address: "",
    userType: "customer",
  });
  const [isLoading, setIsLoading] = useState(false);

  const clearStates = () => {
    setFormData({
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
      address: "",
      mobileNumber: "",
      role: "customer",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Sign Up form submitted:", formData);
    const endpoint = `${process.env.NEXT_PUBLIC_API}/users/signup`;
    console.log(formData)
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        email: formData.email,
        address: formData.address,
        mobileNumber: formData.mobileNumber,
      }),
    }).then((response) => {
      if (response.ok) {
        console.log('success')
      } else {
        console.log(response.json())
      }
    });
    setIsLoading(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle Login submission
    console.log("Login form submitted:", formData);
    // setIsLoading(false);
  };

  const handleForgetPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle Forget Password submission
    console.log("Forget Password form submitted:", formData.email);
    // setIsLoading(false);
  };

  return (
    <div>
      <Tabs defaultValue="login" className="m-10" onValueChange={clearStates}>
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
            className="flex flex-col justify-center items-center w-[15rem] "
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered input-md max-w-[10rem] block mb-5 mt-7"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered input-md max-w-[10rem] block mb-5"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input input-bordered input-md max-w-[10rem] block mb-5"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered input-md max-w-[10rem] block mb-5"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="input input-bordered input-md max-w-[10rem] block mb-5"
            />
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.address}
              onChange={handleChange}
              className="input input-bordered input-md max-w-[10rem] block mb-5"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="select select-bordered select-md w-[10rem] block mb-5"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
            <button type="submit" className="btn  btn-outline">
              {isLoading ? <Loading /> : "Sign Up"}
            </button>
          </form>
        </TabsContent>
        <TabsContent value="login">
          <form
            onSubmit={handleLoginSubmit}
            className="flex flex-col justify-center items-center w-[15rem] "
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered input-md max-w-[10rem] block mb-5 mt-7"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered input-md max-w-[10rem] block mb-5"
            />
            <button type="submit" className="btn btn-outline">
              {isLoading ? <Loading /> : "Login"}
            </button>
          </form>
        </TabsContent>
        <TabsContent value="forget">
          <form
            onSubmit={handleForgetPasswordSubmit}
            className="flex flex-col justify-center items-center w-[15rem] "
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered input-md max-w-[10rem] block mb-5 mt-7"
            />
            <button type="submit" className="btn btn-outline">
              {isLoading ? <Loading /> : "Submit"}
            </button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
