"use client";
import React from "react";
import { signOut } from "next-auth/react";
type Props = {};

function Button({}: Props) {
  return (
    <button className="btn" onClick={() => signOut()}>
      Sign Out
    </button>
  );
}

export default Button;
