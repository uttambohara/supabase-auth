import { AlertCircle, Check } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertElProps {
  type: "error" | "success";
  children: React.ReactNode;
}

export function AlertEl({ children, type }: AlertElProps) {
  if (type === "success") {
    return (
      <Alert className="text-green-700 border-green-400/40 shadow-sm">
        <Check color="green" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    );
  }
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="italic">{children}</AlertDescription>
    </Alert>
  );
}
