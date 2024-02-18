import React from "react";
import defaultImg from "../../assets/Hologo_logo.png";

const EventAlert = () => {
  return (
    <React.Fragment>
      {" "}
      <a
        href="#"
        class="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        <div class="flex-shrink-0">
          <img
            class="w-11 h-11 rounded-full"
            src={defaultImg}
            alt="Robert image"
          />
          <div class="flex relative  justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-700">
            <svg
              class="w-2 h-2 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
            </svg>
          </div>
        </div>
        <div class="pl-3 w-full">
          <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white">
              A new event has been added
            </span>{" "}
            Checkout for more information.{" "}
            <a href="" className="text-blue-500">
              View
            </a>
          </div>
          <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
            yesterday
          </div>
        </div>
      </a>
    </React.Fragment>
  );
};
export default EventAlert;
