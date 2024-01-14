import React, { useState, useEffect } from "react";
import "./Main.css";
import HologoLogo from "./assets/Hologo_logo.png";
import Navbar from "./Navbar/Navbar";
import Products from "./Products/Products";
import User from "./User/User";
const Main = () => {
  return (
    <React.Fragment>
      <div className="main-screen-container">
        <div className="navbar-header-container">
          <Navbar />
        </div>
        <div className="skooler-main-container">
          <User />
        </div>
        <div>
          <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
              <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

              <div class="sm:flex sm:items-center sm:justify-between">
                <a
                  href="https://flowbite.com/"
                  class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                >
                  <img src={HologoLogo} class="h-15 w-20" alt="Hologo Logo" />
                  <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-gray-500">
                    Hologo
                  </span>
                </a>
                <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                  <li>
                    <a href="#" class="hover:underline me-4 md:me-6">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline me-4 md:me-6">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline me-4 md:me-6">
                      Licensing
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
              <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2023{" "}
                <a href="https://flowbite.com/" class="hover:underline">
                  Hologo™
                </a>
                . All Rights Reserved
              </span>
            </div>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Main;
