import React from "react";
import Logo from "../assets/MHDLogo-white.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-center md:justify-start">
            <Link to={`/`} className="flex items-center text-white">
              <img
                loading="lazy"
                className="h-12 w-auto mr-2"
                src={Logo}
                alt="logo"
              />
              <span className="font-semibold text-xl tracking-tight">MASTER HELP DESK</span>
            </Link>
          </div>
          <div className="mt-4 md:mt-0 md:flex md:items-center">
            <div className="text-sm text-gray-400 mr-4">
              <a href="../#featureNew">
            <button className="footer-link">Feature News</button>
          </a>
              <span className="mx-2">|</span>
              <a href="../#aboutUs">
            <button lassName="footer-link">About Us</button>
          </a>
              <span className="mx-2">|</span>
          <a href="../#contact">
            <button className="footer-link">Contact</button>
          </a>              <span className="mx-2">|</span>
          <a href="/term">
            <button className="footer-link">Term of Service</button>
          </a>  
            </div>
            <div className="flex items-center">
              <div className="text-sm text-white mr-4">
                &copy; 2024 All rights reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
