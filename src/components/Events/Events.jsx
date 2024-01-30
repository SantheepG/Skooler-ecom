import React, { useEffect, useState } from "react";
import "./Events.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import { PiSortAscendingBold } from "react-icons/pi";
import axios from "axios";
import EventRow from "./EventRow";
import EventPreview from "./EventPreview";
import Navbar2 from "../Navbar/Navbar2";
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

  const sortNewToOld = () => {
    const sortedEvents = [...events].sort(
      (a, b) => new Date(b.event_datetime) - new Date(a.event_datetime)
    );
    setEvents(sortedEvents);
  };

  const sortOldToNew = () => {
    const sortedEvents = [...events].sort(
      (a, b) => new Date(a.event_datetime) - new Date(b.event_datetime)
    );
    setEvents(sortedEvents);
  };

  return (
    <React.Fragment>
      {" "}
      <div className="main-screen-container">
        <div className="navbar-header-container">
          <Navbar2 />
        </div>
        <div
          className={`${
            overlayClicked ? "opacity-40" : ""
          } skooler-main-container mx-36`}
        >
          <div class="flex mt-20 pt-3">
            <div class=" flex-1">
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
                      <div className="absolute bg-white border -mx-10 mt-2 SlideDown">
                        <a
                          href="#"
                          class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-2"
                          onClick={() => {
                            sortNewToOld();
                            setShowSortDropdown(!showSortDropdown);
                          }}
                        >
                          Newest
                        </a>
                        <a
                          href="#"
                          class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-3"
                          onClick={() => {
                            sortOldToNew();
                            setShowSortDropdown(!showSortDropdown);
                          }}
                        >
                          Earliest
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <hr class="border-gray-300" />
                <div className=" ml-10 mr-10 mt-5">
                  {events.length !== 0 ? (
                    events.map((event, index) => (
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
                    ))
                  ) : (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      No events available
                    </tr>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
        <div
          id="previewUserModal"
          tabindex="-1"
          aria-hidden="true"
          className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full ${
            previewEventClicked ? "" : "hidden"
          }`}
        >
          <EventPreview
            closeModal={() => {
              setOverlayClicked(!overlayClicked);
              setpreviewEventClicked(!previewEventClicked);
            }}
            event={currentEvent}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Events;
