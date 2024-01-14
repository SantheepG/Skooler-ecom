import React, { useEffect, useState } from "react";
import "./Events.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import { PiSortAscendingBold } from "react-icons/pi";
import axios from "axios";
import EventRow from "./EventRow";
const Events = () => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [events, setEvents] = useState([]);
  const [overlayClicked, setOverlayClicked] = useState(false);
  const [addEventClicked, setAddEventClicked] = useState(false);
  const [editEventClicked, setEditEventClicked] = useState(false);
  const [previewEventClicked, setpreviewEventClicked] = useState(false);
  const [deleteEventClicked, setdeleteEventClicked] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentEvent, setCurrentEvent] = useState("");
  const [reloadComponent, setReloadComponent] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/events");
        if (response && response.data) {
          setEvents(response.data.events);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, [reloadComponent]);

  return (
    <React.Fragment>
      {" "}
      <div className="main-screen-container">
        <div className="navbar-header-container">
          <Navbar />
        </div>
        <div className="skooler-main-container mr-24">
          <div class="flex mt-20 pt-3">
            <div class="w-1/5 ml-5 pt-5 h-full pb-10 px-14 border border-gray-300">
              <label
                for="categories"
                class="mb-10 block text-xl font-semibold  mb-5 mt-5 text-sm font-medium text-gray-500 dark:text-white"
              >
                Filter options
              </label>

              <div className="mt-10">
                <span>
                  <button class="text-sm mx-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-red-300 rounded ">
                    Reset
                  </button>
                </span>
                <span>
                  <button class="text-sm mx-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-blue-300 rounded">
                    Filter
                  </button>
                </span>
              </div>
            </div>

            <div class="w-4/5 flex-1">
              <div class="px-10 ">
                <div className="flex justify-between w-full mb-5">
                  <div className=" text-xl font-semibold ml-10">
                    <h2 className="text-gray-600">All events</h2>
                  </div>
                  <div className="text-2xl mr-10">
                    <button
                      type="button"
                      data-dropdown-toggle="cart-dropdown"
                      class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                    >
                      <span class="sr-only">View sort</span>
                      <span className="text-2xl">
                        <PiSortAscendingBold />
                      </span>
                    </button>
                    {showSortDropdown && (
                      <div className="Sort-dropdown-content">
                        <a
                          href="#"
                          class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-2"
                        >
                          Newest
                        </a>
                        <a
                          href="#"
                          class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-3"
                        >
                          Price: Low to High
                        </a>
                        <a
                          href="#"
                          class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-4"
                        >
                          Price: High to Low
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <hr class="border-gray-300" />
                <tbody>
                  {events.length !== 0 ? (
                    events.map((event, index) => (
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <EventRow
                          key={event.id}
                          event={event}
                          previewEvent={() => {
                            setOverlayClicked(!overlayClicked);
                            setpreviewEventClicked(!previewEventClicked);
                            setCurrentEventIndex(index);
                            setCurrentEvent(events[index]);
                          }}
                          editEvent={() => {
                            setOverlayClicked(!overlayClicked);
                            setEditEventClicked(!editEventClicked);
                            setCurrentEventIndex(index);
                            setCurrentEvent(events[index]);
                          }}
                          deleteEvent={() => {
                            setOverlayClicked(!overlayClicked);
                            setdeleteEventClicked(!deleteEventClicked);
                            setCurrentEventIndex(index);
                            setCurrentEvent(events[index]);
                          }}
                        />
                      </tr>
                    ))
                  ) : (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      No events available
                    </tr>
                  )}
                </tbody>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Events;
