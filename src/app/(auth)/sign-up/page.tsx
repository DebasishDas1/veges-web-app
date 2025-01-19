import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import SignupForm from "@/components/SignupForm";
import { userSignup } from "@/api/user-auth";

interface SignUpProp {
  params: Promise<{
    email?: string;
    password?: string;
  }>;
}

const SignUp = async ({ params }: SignUpProp) => {
  const { email, password } = await params;
  const result = await userSignup({ email: email, password: password });

  console.log(result);

  return (
    <>
      <Link href="/">
        <Image src="/icon2.png" alt="Error" width={300} height={300} />
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight py-2">
        Create an account
      </h1>
      <Link
        className={buttonVariants({
          variant: "link",
          className: "gap-1.5",
        })}
        href="/sign-in"
      >
        Already have an account? Sign-in
        <ArrowRight className="h-4 w-4" />
      </Link>
      <SignupForm />
    </>
  );
};

export default SignUp;
