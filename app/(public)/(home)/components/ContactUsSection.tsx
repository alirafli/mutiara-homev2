import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ContactUsSection = () => {
  return (
    <div className="mt-24 md:mt-44 max-w-screen-xl flex flex-col items-center justify-between px-4 mx-auto">
      <h2
        className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mx-auto"
        id="contact-us"
      >
        Kontak Kami
      </h2>

      <p className="leading-7 text-center md:text-left mb-5">
      Hubungi kami jika kamu memiliki pertanyaan!
      </p>

      <Button>
        <Link target="_blank" href="https://wa.me/+6282299648023">
          WhatsApp
        </Link>
      </Button>
    </div>
  );
};

export default ContactUsSection;
