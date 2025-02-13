import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <main className="relative flex flex-col min-h-screen items-center justify-center">
      <Loader2 className="animate-spin" />
    </main>
  );
};

export default loading;
