import React from "react";
import rilla from "./assets/rilla.jpeg";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-yellow-400">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <div
                className="bg-black w-32 h-12 flex items-center justify-center"
                style={{
                  backgroundImage: `url(${rilla})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4"></div>
            </div>
          </div>

          <div
           className="flex justify-end pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button className="bg-black hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg hover:text-black">
              Sign in
            </button>
            <button className="bg-black hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg hover:text-black ml-6">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
