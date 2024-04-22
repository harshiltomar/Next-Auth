"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      console.log(user);
      setLoading(true);
      const response = await axios.post("/api/users/login", {
        user,
      });
      console.log("Login Success", response.data);
      router.push("/profile");
    } catch (error) {
      console.log("Signup Failed", error);
      toast.error("Signup Failed");
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-12 rounded-lg bg-slate-900 flex flex-col items-center justify-center">
        <h1 className="pb-4 text-3xl text-blue-500 font-thin">
          {loading ? "PROCESSING..." : "LOGIN"}
        </h1>
        <hr />
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onLogin}
          className="px-20 mt-4 p-2 border bg-slate-800 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "Fill Details" : "Login"}
        </button>
        <Link href="/login">Visit Signup page</Link>
      </div>
    </div>
  );
}

//24.27
