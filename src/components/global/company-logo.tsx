import Image from "next/image";
import React from "react";

export default function CompanyLogo() {
  return (
    <div className="relative h-[6rem] w-[12rem]">
      <Image
        src={"/logo.svg"}
        alt={"Company"}
        fill
        priority
        className="absolute"
      />
    </div>
  );
}
