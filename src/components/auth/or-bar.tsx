import React from "react";

export default function OrBar() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-[0.4px] w-full bg-gray-400/40"></div>
      <div>OR</div>
      <div className="h-[0.4px] w-full bg-gray-400/40"></div>
    </div>
  );
}
