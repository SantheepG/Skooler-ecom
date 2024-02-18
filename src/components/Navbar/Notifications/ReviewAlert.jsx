import React from "react";
import defaultImg from "../../assets/Hologo_logo.png";
import { formatDate, calculateElapsedTime } from "../../CommonFuncs";
const ReviewAlert = ({ alert }) => {
  return (
    <React.Fragment>
      <a
        href="#"
        class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
      >
        <div class="flex-shrink-0">
          <img
            class="w-11 h-11 rounded-full"
            src={defaultImg}
            alt="Joseph McFall avatar"
          />
          <div class="flex relative  justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700">
            <svg
              class="w-2 h-2 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              {" "}
              <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />{" "}
            </svg>
          </div>
        </div>
        <div class="pl-3 w-full">
          <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white">
              Thank you for your valuable review.
            </span>{" "}
            <span class="font-medium text-gray-900 dark:text-white">
              Happy shopping
            </span>{" "}
          </div>
          <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
            {alert.event_datetime !== null &&
              calculateElapsedTime(alert.created_at)}
          </div>
        </div>
      </a>
    </React.Fragment>
  );
};
export default ReviewAlert;
