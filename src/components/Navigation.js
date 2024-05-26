import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Navigation() {
  const checkUser = localStorage.getItem("checkUser");

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <div className="flex items-center gap-x-4">
              <img
                loading="lazy"
                className="object-cover h-12 w-12 sm:h-16 sm:w-16"
                src={Logo}
                alt="logo"
              />
              <span className="text-xl sm:text-2xl font-semibold tracking-wide">
                MASTER HELP DESK
              </span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-x-10">
            <a href="../#featureNew">
              <button className="font-semibold">Feature News</button>
            </a>
            <a href="../#aboutUs">
              <button className="font-semibold">About Us</button>
            </a>
            <a href="../#contact">
              <button className="font-semibold">Contact</button>
            </a>
            {checkUser === "user" ? (
              <Link to="/organizations">
                <button className="bg-[#3867A5] hover:bg-[#2B4B75] text-white py-2 px-6 rounded-full w-40 tracking-widest">
                  <b>Dashboard</b>
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="bg-[#3867A5] hover:bg-[#2B4B75] text-white py-2 px-6 rounded-full w-40 tracking-widest">
                  <b>SIGN IN</b>
                </button>
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() =>
                document
                  .getElementById("mobile-menu")
                  .classList.toggle("hidden")
              }
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="../#featureNew"
            className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Feature News
          </a>
          <a
            href="../#aboutUs"
            className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            About Us
          </a>
          <a
            href="../#contact"
            className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </a>
          {checkUser !== "user" ? (
            <Link to="/organizations">
              <button className="bg-[#3867A5] hover:bg-[#2B4B75] text-white w-full text-center py-2 rounded-md text-base font-medium">
                <b>Dashboard</b>
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-[#3867A5] hover:bg-[#2B4B75] text-white w-full text-center py-2 rounded-md text-base font-medium">
                <b>SIGN IN</b>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
