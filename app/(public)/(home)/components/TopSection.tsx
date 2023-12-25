import Image from "next/image";
import React from "react";

function TopSection() {
  return (
    <div className="max-w-screen-xl flex flex-col-reverse md:flex-row items-center justify-between px-4 mx-auto">
      <div className="mt-14 md:mt-0 text-center md:text-left mr-0 md:mr-5">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Cari kontrakan dengan mudah
        </h2>
        <h4 className="scroll-m-20 text-lg font-medium tracking-tight">
          Cari rumah sewa secara online tanpa perlu datang langsung!
        </h4>
      </div>

      <div className="relative h-56 md:h-96 w-56 md:w-96">
        <Image
          src="images/house-searching.svg"
          alt="House Searching Storyset"
          fill
        />
      </div>
    </div>
  );
}

export default TopSection;
