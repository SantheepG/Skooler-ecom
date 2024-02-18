import React, { useState, useEffect } from "react";
import "./Notifications.css";
import ReviewAlert from "./ReviewAlert";
import OrderAlert from "./ReviewAlert";
import ComplaintAlert from "./ComplaintAlert";

const Notifications = ({ reviewAlert, orderAlert, complaintAlert, close }) => {
  return (
    <React.Fragment>
      <div
        class="SlideDown overflow-hidden z-50 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700"
        id="notification-dropdown"
        onClick={close}
      >
        <div class="py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          Notifications
        </div>
        <div class="h-80 overflow-y-auto">
          {reviewAlert.length !== 0 &&
            reviewAlert.map((alert) => (
              <ReviewAlert key={alert.id} alert={alert} />
            ))}
          {orderAlert.length !== 0 &&
            orderAlert.map((alert) => (
              <OrderAlert key={alert.id} alert={alert} />
            ))}
          {complaintAlert.length !== 0 &&
            complaintAlert.map((alert) => (
              <ComplaintAlert key={alert.id} alert={alert} />
            ))}
          {reviewAlert.length === 0 &&
            orderAlert === 0 &&
            complaintAlert ===
              0(
                <a
                  href="#"
                  class="flex py-3 px-32 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                >
                  <div class="pl-3 w-full">
                    <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                      Nothing available
                    </div>
                  </div>
                </a>
              )}
        </div>
        <a
          href="#"
          class="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
        >
          <div class="inline-flex items-center "></div>
        </a>
      </div>
    </React.Fragment>
  );
};

export default Notifications;
