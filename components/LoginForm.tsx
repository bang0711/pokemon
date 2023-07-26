"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
type Props = {};

function LoginForm({}: Props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const login = async (e: any) => {
    e.preventDefault();
    signIn("credentials", {
      ...data,
      redirect: false,
    });
    router.push("/");
    router.refresh();
  };
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <form
        onSubmit={login}
        action=""
        className="flex h-full flex-col w-full md:w-[80%] lg:w-[60%] xl:w-[50%] gap-3 p-3 rounded-lg font-medium border-2 border-gray-200 shadow-md"
      >
        <div className="input">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name="Email"
            id="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Enter your email"
          />
        </div>

        <div className="input">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            name="Password"
            id="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn w-fit mx-auto">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
