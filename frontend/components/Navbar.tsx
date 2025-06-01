import Link from "next/link";
import React from "react";
import { Toggle } from "./Toggle";

const Navbar = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-semibold">
            <Link href={"/"}>Blaze 🔥</Link>
          </h1>
        </div>
        <div>
          <Toggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
