import React from "react";
import defaultImg from "../../assets/Hologo_logo.png";
import { formatDate, calculateElapsedTime } from "../../CommonFuncs";
const OrderAlert = ({ alert }) => {
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
            alt="Jese Leos avatar"
          />
          <div class="flex relative  justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700">
            <svg
              class="w-2 h-2 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
            </svg>
          </div>
        </div>
        <div class="pl-3 w-full">
          <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white">
              {alert.name}
            </span>{" "}
            :{" "}
            <span class="font-medium text-gray-900 dark:text-white">
              {alert.info}
            </span>{" "}
            <a href="" className="text-blue-500"></a>
          </div>
          <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
            {alert.created_at !== null &&
              calculateElapsedTime(alert.created_at)}
          </div>
        </div>
      </a>
    </React.Fragment>
  );
};
export default OrderAlert;
