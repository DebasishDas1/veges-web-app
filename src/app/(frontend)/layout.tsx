import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow flex-1">{children}</div>
      <Footer />
    </main>
  );
}
