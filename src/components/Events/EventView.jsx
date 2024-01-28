import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../Footer";
const EventView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    student_id: "",
    mobile_no: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      setUserData(storedUserData);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/events/${id}`
        );
        if (response) {
          setEvent(response.data.event);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchEventData();
  }, [id]);
  return (
    <React.Fragment>
      <div className="main-screen-container">
        <div className="navbar-header-container">
          <Navbar />
        </div>

        <div className="skooler-main-container mx-96 my-24">
          <Toaster className="notifier" />
          <div class="relative w-full max-w-3xl max-h-full">
            <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {event.event_name}
                  <div className="text-xs text-gray-400 mt-2">
                    to be held on : {event.event_datetime}
                  </div>
                </h3>
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
                    <div class="p-8 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
                      <div>
                        <span className="mt-4 text-xl font-semibold">
                          <span>$</span>
                          {event.payment}
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
                        <span>Closing date : </span>
                        <span>
                          {event.payment_deadline !== null
                            ? event.payment_deadline
                            : null}
                        </span>
                      </div>
                      <div className="mt-8">
                        <input
                          type="number"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder=""
                          min={1}
                          defaultValue={1}
                          required
                        />
                      </div>
                      <div className="mt-6">
                        {event.capacity !== null ? (
                          event.capacity === event.reserved_slots ? (
                            <button
                              disabled
                              type="button"
                              class="text-white disabled:bg-gray-300 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              <svg
                                class="w-3.5 h-3.5 me-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 21"
                              >
                                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                              </svg>
                              Buy now
                            </button>
                          ) : (
                            <button
                              type="button"
                              class="text-white disabled:bg-gray-300 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              <svg
                                class="w-3.5 h-3.5 me-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 21"
                              >
                                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                              </svg>
                              Buy now
                            </button>
                          )
                        ) : (
                          <button
                            type="button"
                            class="text-white disabled:bg-gray-300 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            <svg
                              class="w-3.5 h-3.5 me-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 21"
                            >
                              <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                            </svg>
                            Buy now
                          </button>
                        )}
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
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};
export default EventView;
