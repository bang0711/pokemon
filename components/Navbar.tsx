import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Button from "./Button";

type Props = {};

async function Navbar({}: Props) {
  const session = await getServerSession(authOptions);
  return (
    <header className="w-full p-3 shadow-md sticky z-50 top-0 h-[10vh]  backdrop-blur-md">
      <nav className="flex items-center justify-between">
        <Link href={"/"} className="btn">
          Home
        </Link>

        {session ? (
          <div className="flex items-center gap-2">
            <Link href={"/dashboard"} className="btn">
              Dashboard
            </Link>
            <Button />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href={"/login"} className="btn">
              Login
            </Link>
            <Link href={"/register"} className="btn">
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
