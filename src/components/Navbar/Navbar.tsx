import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="container mx-auto lg:px-2 px-5">
      <div className="container flex items-center justify-between mx-auto py-4">
        <Link href="/" className="text-2xl font-medium">
          Sonomans
        </Link>
        <ul className="flex items-center text-sm space-x-4">
          <li>
            <Link
              href="/"
              className="block px-4 py-2 hover:text-sky-900 transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block px-4 py-2 hover:text-sky-900 transition-all duration-300"
            >
              Twitter
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block px-4 py-2 hover:text-sky-900 transition-all duration-300"
            >
              Instagram
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
