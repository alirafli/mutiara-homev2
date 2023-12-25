import React from "react";

const Footer = () => {
  const date = new Date();
  return (
    <div className="bg-zinc-900 py-3 px-0 md:px-3 text-center md:text-left text-white">
      Mutiara Home, copyright {date.getFullYear()}
    </div>
  );
};

export default Footer;
