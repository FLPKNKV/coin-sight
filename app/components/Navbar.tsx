"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white">
      <div className="text-xl font-bold">
        <p>Logo</p>
      </div>

      <div className="text-lg font-spacemono text-gray-800">
        How to use this app?
      </div>
      <div className="space-x-4">
        <Link href="/register">
          <button className="text-black px-4 py-2 rounded hover:text-primary">
            Register
          </button>
        </Link>
        <Link href="/login">
          <button className="text-black px-4 py-2 rounded hover:text-primary focus:outline-none">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
