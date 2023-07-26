"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
type Props = {};

function RegisterForm({}: Props) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const register = async (e: any) => {
    e.preventDefault();
    await fetch("https://learn-authentication.vercel.app/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    router.push("/login");
  };
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <form
        onSubmit={register}
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
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            name="Name"
            id="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Enter your name"
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
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
