// pages/404.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";

const Custom404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image src="/404_error_page.png" alt="Error" width={400} height={400} />
      <p className="text-lg text-gray-600 mb-8 text-center">
        It seems like you&apos;ve stumbled upon a page that doesn&apos;t exist.
      </p>
      <Link href="/" className={buttonVariants()}>
        Go back to home
      </Link>
    </div>
  );
};

export default Custom404;
