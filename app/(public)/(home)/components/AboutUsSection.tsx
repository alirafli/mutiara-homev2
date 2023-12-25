import Image from "next/image";
import React from "react";

function AboutUsSection() {
  return (
    <div className="mt-28 md:mt-44 max-w-screen-xl flex flex-col items-center justify-between px-4 mx-auto">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mx-auto mb-20">
        Tentang Kami
      </h2>

      <div className="flex items-center md:gap-48 flex-col md:flex-row">
        <div className="flex gap-6 mx-auto">
          <div className="relative h-56 md:h-96 w-56 md:w-96">
            <Image
              src="images/House searching-bro.svg"
              alt="House Searching Storyset"
              fill
            />
          </div>
        </div>

        <p className="leading-7 [&:not(:first-child)]:mt-6 text-center md:text-left">
          Menyediakan rumah yang dapat disewakan di daerah Tangerang Selatan
          dengan harga yang terjangkau.
        </p>
      </div>
    </div>
  );
}

export default AboutUsSection;
