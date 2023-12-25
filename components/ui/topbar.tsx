"use client";

import React, { useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";

const Topbar = () => {
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);

  const handleNavbarCollapsed = () => {
    setNavbarCollapsed(!navbarCollapsed);
  };

  const item = [
    { title: "Halaman Utama", href: "/", isLogin: false },
    {
      title: "Cari Rumah Sewa",
      href: "/#find-home",
      isLogin: false,
    },
    {
      title: "Kontak Kami",
      href: "/#contact-us",
      isLogin: false,
    },
    {
      title: "Laporan Penyewa",
      href: "/dashboard",
      isLogin: true,
    },
  ];

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-[9999]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          onClick={handleNavbarCollapsed}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="relative h-14 w-14">
            <Image src="/images/logo.png" fill alt="Mutiara Home Logo" />
          </div>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={handleNavbarCollapsed}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${navbarCollapsed && "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {item
              .filter((e) => !e.isLogin)
              .map((e) => (
                <li key={e.title}>
                  <Link
                    onClick={handleNavbarCollapsed}
                    href={e.href}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {e.title}
                  </Link>
                </li>
              ))}

            <Button>
              <Link href="/sign-in">Masuk</Link>
            </Button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
