import React from "react";
import Navbar from "./Navbar";
import homeimg from '../images/aicte-building.jpg';

const HomePage = () => {
  return (
    <div>
      <Navbar/>

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        
        <img src={homeimg} alt="Homepage Image" className="w-1/2 mb-4" />
        <h1 className="text-3xl font-bold mb-4">
          Welcome to{" "}
          <span className="text-talent-orange">Talent</span>
          <span className="text-trail-blue">Trail</span>
          <span className="text-india-green">India</span>
        </h1>
        <p className="text-lg text-center">
          Your partner in the placement journey. We're here to help you succeed!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
