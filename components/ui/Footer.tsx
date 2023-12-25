import React from "react";

const Footer = () => {
  const date = new Date();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 py-3 px-0 md:px-3 text-center md:text-left text-white">
      Mutiara Home, copyright {date.getFullYear()}
    </div>
  );
};

export default Footer;
