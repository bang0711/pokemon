import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
type Props = {};

async function LoginPage({}: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
