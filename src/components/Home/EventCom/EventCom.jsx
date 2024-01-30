import React, { useEffect, useRef, useState } from "react";
import "./EventCom.css";
import "../EventSingle/EventSingle.css";
import { useNavigate } from "react-router-dom";
import { setClicked } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
const EventCom = ({ events }) => {
  const dispatch = useDispatch();
  const navBarstate = useSelector((state) => state.navbar);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const scrollAmount = container.scrollHeight - container.clientHeight;
      let scrollPos = 0;

      const scrollInterval = setInterval(() => {
        container.scrollTo({
          top: scrollPos,
          behavior: "smooth",
        });

        scrollPos += 1;
        if (scrollPos >= scrollAmount) {
          scrollPos = 0;
        }
      }, 50);

      return () => clearInterval(scrollInterval);
    }
  }, [events]);

  const handleEventClick = (item, id) => {
    if (!navBarstate[item]) {
      //navBarstate.eventsClicked(true);
      dispatch(setClicked(item, true));
      navigate(`/event/${id}`);
    } else {
      dispatch(setClicked(item, false));
      //navBarstate.eventsClicked(false);
      //navBarstate.eventsClicked(true);
      dispatch(setClicked(item, true));
      navigate(`/event/${id}`);
    }
  };

  return (
    <React.Fragment>
      <div
        className="event-com-scrollable"
        ref={containerRef}
        onScroll={() => setScroll(true)}
      >
        <ol class="relative border-s border-gray-200 dark:border-gray-700">
          {events.map((event) => (
            <li class="mb-10 ms-4" key={event.id}>
              <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {event.event_datetime}
              </time>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {event.name}
              </h3>
              <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {event.event_info}
              </p>
              <a
                href="#"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                key={event.id}
                onClick={() => {
                  handleEventClick("eventViewClicked", event.id);
                }}
              >
                View
                <svg
                  class="w-3 h-3 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </React.Fragment>
  );
};

export default EventCom;
