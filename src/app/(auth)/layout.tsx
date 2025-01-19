export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col min-h-screen items-center justify-center">
      {children}
    </main>
  );
}
