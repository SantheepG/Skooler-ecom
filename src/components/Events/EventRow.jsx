import React, { useState } from "react";
import { formatDate } from "../CommonFuncs";
const EventRow = ({ event, previewEvent, editEvent, deleteEvent }) => {
  const [viewEditDropdown, setViewEditDropdown] = useState(false);

  return (
    <React.Fragment>
      <div
        className="group cursor-pointer mx-2 mt-10 grid max-w-screen-lg grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 space-x-8 overflow-hidden rounded-lg border text-gray-700 shadow transition hover:shadow-md sm:mx-auto"
        onClick={() => {
          previewEvent();
        }}
      >
        <a
          href="#"
          className="col-span-2 h-48 w-full sm:w-96 text-left text-gray-600 hover:text-gray-700"
        >
          <div className="group relative h-full w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
              alt=""
              className="h-full w-full border-none object-cover text-gray-700 transition group-hover:scale-125"
            />
            {parseInt(event.payment) === 0 ? (
              <span className="absolute top-2 left-2 rounded-full bg-yellow-200 px-2 text-xs font-semibold text-yellow-600">
                Free
              </span>
            ) : (
              <span className="absolute top-2 left-2 rounded-full bg-yellow-200 px-2 text-xs font-semibold text-yellow-600">
                <span>$</span>
                <span>{event.payment}</span>
              </span>
            )}
            <img
              src="/images/AnbWyIjnwNbW9Wz6c_cja.svg"
              className="absolute inset-1/2 w-10 max-w-full -translate-x-1/2 -translate-y-1/2 transition group-hover:scale-125"
              alt=""
            />
          </div>
        </a>
        <div className="col-span-3 flex flex-col space-y-3 pr-8 text-left">
          <a href="#" className="mt-3 overflow-hidden text-xl font-semibold">
            {event.event_name}
          </a>
          <p className="overflow-hidden text-sm">{event.event_info}</p>
          <a
            href="#"
            className="text-xs font-semibold text-gray-500 hover:text-gray-700"
          >
            Venue : {event.venue}
          </a>
          <a
            href="#"
            class="text-xs font-semibold text-gray-500 hover:text-gray-700"
          ></a>{" "}
          <div className="flex flex-col text-gray-700 sm:flex-row">
            <div class="flex h-fit space-x-2 text-xs ">
              <div class="rounded-full border border-blue-300 b-2 px-2 py-0.5 text-green-700">
                {event.event_datetime !== null &&
                  formatDate(event.event_datetime)}
              </div>

              {event.capacity !== null ? (
                event.capacity === event.reserved_slots ? (
                  <span class="inline-flex items-center px-4 py-1 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                    <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                    Unavailable
                  </span>
                ) : (
                  <span class="inline-flex items-center px-4 py-1 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    Available
                  </span>
                )
              ) : (
                <span class="inline-flex items-center px-4 py-1 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                  Available
                </span>
              )}
              {event.payment_deadline !== null ? (
                <div class="rounded-full border border-blue-300 b-2 px-2 py-0.5 text-green-700">
                  Closing :{" "}
                  {event.event_datetime !== null &&
                    formatDate(event.payment_deadline)}
                </div>
              ) : null}

              <div></div>
            </div>
            <div></div>
            <a
              href="#"
              className="rounded-3xl px-4 py-1 mt-2 mb-2 border-2 text-center transition hover:scale-105 border-2 border-orange-300 text-gray-600 sm:ml-auto"
            >
              View
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default EventRow;
