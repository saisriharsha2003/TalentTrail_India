import React from "react";

const Navbar = () => {
  return (
    <nav className=" py-4 px-8 flex justify-between bg-blue-500 items-center">
      <div className="text-2xl bg-white font-bold">
        <span className="text-talent-orange">Talent</span>
        <span className="text-trail-blue">Trail</span>
        <span className=" text-india-green">India</span>
      </div>
      <div className="font-semibold text-xl text-white">
        <a href="/">Home</a>
        <a href="/login" className="ml-4">Login</a>
        <a href="/register" className="ml-4">Register</a>
      </div>
    </nav>
  );
};

export default Navbar;
