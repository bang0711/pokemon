import RegisterForm from "@/components/RegisterForm";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
type Props = {};

async function RegisterPage({}: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
