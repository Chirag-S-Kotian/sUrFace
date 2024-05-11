"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LoginForm = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const response = await axios.post("api/users/login", user);
      console.log("login successful", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.error("login failed", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Your email address"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Your password"
            />
          </div>
          <button
            onChange={onLogin}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
          <p className="mt-4 text-center text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="hover:text-pink-900">
              SignUp here..!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
