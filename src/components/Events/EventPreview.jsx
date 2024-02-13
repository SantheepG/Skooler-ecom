import React from "react";

const EventPreview = ({ closeModal, event }) => {
  const formatDate = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };
  return (
    <React.Fragment>
      <div class="relative w-full max-w-3xl max-h-full">
        <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {event.event_name}
              <div className="text-xs text-gray-400 mt-2">
                to be held on{" "}
                {event.event_datetime !== null &&
                  formatDate(event.event_datetime)}
              </div>
            </h3>

            <div>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="editUserModal"
                onClick={() => closeModal()}
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">
                  <a href="#">Close</a>
                </span>
              </button>
            </div>
          </div>
          <div className="p-4 overflow-y-auto">
            <dl class="sm:mb-5">
              <div class="grid grid-cols-2 gap-3 mb-4 sm:mb-5">
                <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
                  <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
                    alt="iMac Side Image"
                  />
                </div>
                <div class="p-8 w-auto bg-gray-50 rounded-lg dark:bg-gray-700">
                  <div>
                    <span className="mt-4 text-xl font-semibold">
                      {parseInt(event.payment) === 0 ? (
                        "Free"
                      ) : (
                        <>
                          <span>$ </span>
                          <span>{event.payment}</span>
                        </>
                      )}
                    </span>

                    {event.capacity !== null ? (
                      event.capacity === event.reserved_slots ? (
                        <span class="inline-flex ml-4 items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                          <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                          Unavailable
                        </span>
                      ) : (
                        <span class="inline-flex ml-4 items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                          Available
                        </span>
                      )
                    ) : (
                      <span class="inline-flex ml-4 items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                        Available
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    <span>
                      {event.payment_deadline !== null ? (
                        <span>Closing date : {event.payment_deadline}</span>
                      ) : null}
                    </span>
                  </div>
                  <div className="mt-8">
                    <input
                      type="number"
                      id="visitors"
                      className={`${
                        parseInt(event.payment) === 0 ||
                        (event.capacity !== null &&
                          event.capacity === event.reserved_slots)
                          ? "hidden"
                          : ""
                      } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder=""
                      min={1}
                      defaultValue={1}
                      required
                    />
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      className={`${
                        parseInt(event.payment) === 0 ||
                        (event.capacity !== null &&
                          event.capacity === event.reserved_slots)
                          ? "hidden"
                          : ""
                      } bg-gray-50 border border-orange-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-orange-500 block px-4 border-2 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </div>

              <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Event name - {event.event_name}
              </dt>
              <dd class="mb-4 font-light text-gray-800 sm:mb-5 dark:text-gray-400">
                <div>{event.event_info}</div>
                <div>venue : {event.venue}</div>
              </dd>
            </dl>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default EventPreview;
