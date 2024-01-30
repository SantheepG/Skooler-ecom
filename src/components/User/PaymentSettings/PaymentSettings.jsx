import React, { useState, useEffect } from "react";
import "./PaymentSettings.css";
const PaymentSettings = () => {
  const [cardDetails, setCardDetails] = useState([]);
  const [view, setView] = useState(false);
  return (
    <React.Fragment>
      <div class="col-span-8 rounded-xl sm:bg-gray-50 px-6 ViewContent">
        <div class="pt-4">
          <h1 class="py-2 text-2xl font-semibold">Payment settings</h1>
        </div>
        <hr class="mt-4 mb-8" />

        <div class="mb-10 grid gap-y-8 lg:grid-cols-2 lg:gap-y-0">
          <div class="space-y-8">
            <div class="">
              <div class="flex">
                <button class="ml-auto inline-flex text-sm font-semibold text-blue-600 underline decoration-2">
                  Change
                </button>
              </div>
              <div class="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                <img
                  class="h-10 object-contain pl-4"
                  src="/images/kt10d0A1TgzZpAoNM_YPX.png"
                  alt=""
                />
                <p class="ml-4 w-56">
                  <strong class="block text-md font-medium">
                    **** **** **** 453{" "}
                  </strong>
                  <strong class="block text-md font-medium">Dev </strong>
                </p>
              </div>
            </div>
          </div>

          <div className="mx-4">
            <div className="w-full mb-4 px-8 flex justify-between items-center">
              <div></div>
              <div className="text-right">
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={() => setView(!view)}
                >
                  Add
                </button>
              </div>
            </div>

            {view && (
              <div class="grid SlideDown gap-y-6 gap-x-3 sm:grid-cols-2 lg:px-8">
                <label class="block sm:col-span-2" for="name">
                  <p class="text-sm">Card number</p>
                  <input
                    class="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                    type="text"
                    value="2015 4541 4511 5461 6161"
                  />
                </label>
                <label class="block" for="name">
                  <p class="text-sm">Expires on</p>
                  <input
                    class="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                    type="text"
                    value="08/24"
                  />
                </label>
                <label class="block" for="name">
                  <p class="text-sm">cvv</p>
                  <input
                    class="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                    type="text"
                    value=""
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaymentSettings;
