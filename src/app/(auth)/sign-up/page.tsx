import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import SignUpForm from "@/components/SignupForm";

const SignUp = async () => {
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
      <SignUpForm />
    </>
  );
};

export default SignUp;
