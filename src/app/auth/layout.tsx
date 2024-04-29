import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100svh] grid place-content-center p-4">{children}</div>
  );
}
