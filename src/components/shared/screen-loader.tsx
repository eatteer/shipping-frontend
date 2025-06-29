import { Loader2 } from "lucide-react";

export const ScreenLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/20 z-[9999] p-4">
      <Loader2 size={48} className="text-primary animate-spin" />
    </div>
  );
};
