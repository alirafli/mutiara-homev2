import React from "react";

function AboutUsSection() {
  return (
    <div className="mt-28 md:mt-44 max-w-screen-xl flex flex-col items-center justify-between px-4 mx-auto">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mx-auto mb-20">
        Tentang Kami
      </h2>

      <div className="flex  md:gap-48 flex-col md:flex-row">
        <div className="flex gap-6 mx-auto">
          <div className="h-40 w-40 bg-red-800"></div>
          <div className="h-40 w-40 bg-red-800"></div>
        </div>

        <p className="leading-7 [&:not(:first-child)]:mt-6 text-center md:text-left">
          The king, seeing how much happier his subjects were, realized the
          error of his ways and repealed the joke tax.
        </p>
      </div>
    </div>
  );
}

export default AboutUsSection;
