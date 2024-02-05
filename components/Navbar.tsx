"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-gray-700 flex p-3 justify-between sm:justify-start sm:gap-20 items-center">
      <Link href="/" className="text-white font-semibold sm:pl-10">
        ShopNew
      </Link>
      <button
        className="text-red-700 font-semibold hover:cursor-pointer"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
