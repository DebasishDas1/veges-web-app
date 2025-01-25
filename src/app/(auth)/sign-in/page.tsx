import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import SignInForm from "@/components/SignInForm";

const SignUp = async () => {
  return (
    <>
      <Link href="/">
        <Image src="/icon2.png" alt="Error" width={300} height={300} />
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight py-2">
        Sign in to your account
      </h1>
      <Link
        className={buttonVariants({
          variant: "link",
          className: "gap-1.5",
        })}
        href="/sign-up"
      >
        Don&apos;t have an account?
        <ArrowRight className="h-4 w-4" />
      </Link>
      <SignInForm />
    </>
  );
};

export default SignUp;
