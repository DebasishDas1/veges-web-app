// import Providers from '@/components/Providers'
import { cn, constructMetadata } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Preload Google Font (Poppins)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = constructMetadata({
  title: "Veges",
  description: "One stop destination for all your Biryani requirements",
  exact: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          poppins.className
        )}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
