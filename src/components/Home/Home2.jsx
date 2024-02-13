import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import CalendarCom from "./CalendarCom/CalendarCom";
import EventCom from "./EventCom/EventCom";
import Slideshow from "./Slideshow/Slideshow";
import Extra from "./Extra";
import axios from "axios";
import { IoIosArrowDropright } from "react-icons/io";
import Navbar2 from "../Navbar/Navbar2";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";
import { setClicked } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const Home2 = ({ ui }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt laudantium rem molestiae.";
  const [displayText, setDisplayText] = useState("");
  const navBarstate = useSelector((state) => state.navbar);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState([]);
  const [slides, setSlides] = useState([
    {
      date: "26 December 2023",
      name: "Lorem Ipsum Dolor",
      desc: "fdfdsfdfsdfdfdfsdfds",
    },
    {
      date: "22 December 2024",
      name: "Lorem Ipsudvdvdvdm Dolor",
      desc: "fdfdsfdfsdfdfdfdddvdsdfds",
    },
    {
      date: "26 December 2024",
      name: "Ipsum Dolor",
      desc: "fdfdsfdfsdfdfdfsdfds",
    },
  ]);

  const [announcement, setAnnouncement] = useState("announcement");
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Change the announcement text here or fetch new data from an API
      setAnnouncement(`New Announcement ${animationKey}`);
      // Trigger re-render with a new key to initiate the animation
      setAnimationKey((prevKey) => prevKey + 1);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    //
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/events");
        //setEvents(response.data.events);
        setEvents(response.data.events);
        console.log(response);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [slides.length]);

  const viewEvent = (item, id) => {
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
      <div className="main-screen-container">
        <div className="navbar-header-container border-b">
          <Navbar2 />
        </div>
        <div className="mx-auto mt-36 px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <div className="lg:max-w-lg lg:pr-5">
              <div className="max-w-xl">
                <div>
                  <p
                    className={`mb-2 w-96 inline-block rounded-full px-3 text-xs font-semibold uppercase tracking-wider text-${ui.primary_clr}-600`}
                  >
                    announcement
                  </p>
                </div>
                <h2
                  key={animationKey}
                  class="mb-6 max-w-lg SlideDown text-3xl font-bold leading-snug tracking-tight text-blue-600 sm:text-5xl sm:leading-snug"
                >
                  {announcement}
                  <span class="my-1 inline-block border-b-8 font-light text-blue-600"></span>
                </h2>
                <p class="text-base text-gray-700">ddfdfd</p>
              </div>
            </div>
            <div class="relative text-blue-600 lg:ml-32 lg:w-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="my-6 mx-auto h-10 w-10 animate-bounce rounded-full bg-blue-50 p-2 lg:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                />
              </svg>
              <div class="w-80 flex mx-24 mt-6 rounded-2xl flex-col bg-gray-50 px-1 py-6 text-center sm:px-3 sm:text-left lg:bg-white lg:py-2 lg:shadow-xl lg:shadow-blue-900/20">
                <CalendarCom events={events} />
              </div>
            </div>
          </div>
        </div>
        <div class="h-screen mt-8">
          <div class="relative mx-auto w-screen">
            <div class="absolute inset-0 bottom-32 bg-gradient-to-t from-indigo-50 to-white "></div>
            <div class="relative mx-auto w-full max-w-screen-xl px-2 pt-20 text-left sm:px-10">
              <div class="mb-24">
                <h1 class="text-center text-3xl font-semibold text-indigo-700 sm:text-3xl">
                  <p class="mt-3 text-xl sm:mt-8 sm:text-2xl">
                    <div>Featured products</div>

                    <span class="mr-3">——</span>
                  </p>
                </h1>
              </div>
              <div class="mx-auto grid max-w-screen-xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                <div class="group rounded-md bg-white p-2 text-left text-indigo-900 shadow-xl shadow-black/5 transition-transform hover:-translate-y-1">
                  <article class="relative">
                    <div class="aspect-square overflow-hidden">
                      <img
                        class="group-hover:scale-125 rounded-lg h-full w-full object-cover transition-all duration-300"
                        src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                        alt=""
                      />
                    </div>
                    <div class="absolute top-0 m-1 rounded-full bg-white">
                      <p class="text-[10px] rounded-full bg-black p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
                        Sale
                      </p>
                    </div>
                    <div class="mt-4 flex items-start justify-between">
                      <div class="">
                        <h3 class="text-xs font-semibold sm:text-sm md:text-base">
                          <a href="#" title="" class="cursor-pointer">
                            Arabian Musk
                            <span class="absolute" aria-hidden="true"></span>
                          </a>
                        </h3>
                        <div class="mt-2 flex items-center">
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <div class="text-right">
                        <del class="mt-px text-xs font-semibold text-gray-600 sm:text-sm">
                          {" "}
                          $79.00{" "}
                        </del>
                        <p class="text-xs font-normal sm:text-sm md:text-base">
                          $99.00
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
                <div class="group rounded-md bg-white p-2 text-left text-indigo-900 shadow-xl shadow-black/5 transition-transform hover:-translate-y-1">
                  <article class="relative">
                    <div class="aspect-square overflow-hidden">
                      <img
                        class="group-hover:scale-125 rounded-lg h-full w-full object-cover transition-all duration-300"
                        src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                        alt=""
                      />
                    </div>
                    <div class="absolute top-0 m-1 rounded-full bg-white">
                      <p class="text-[10px] rounded-full bg-black p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
                        Sale
                      </p>
                    </div>
                    <div class="mt-4 flex items-start justify-between">
                      <div class="">
                        <h3 class="text-xs font-semibold sm:text-sm md:text-base">
                          <a href="#" title="" class="cursor-pointer">
                            Arabian Musk
                            <span class="absolute" aria-hidden="true"></span>
                          </a>
                        </h3>
                        <div class="mt-2 flex items-center">
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <div class="text-right">
                        <del class="mt-px text-xs font-semibold text-gray-600 sm:text-sm">
                          {" "}
                          $79.00{" "}
                        </del>
                        <p class="text-xs font-normal sm:text-sm md:text-base">
                          $99.00
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
                <div class="group rounded-md bg-white p-2 text-left text-indigo-900 shadow-xl shadow-black/5 transition-transform hover:-translate-y-1">
                  <article class="relative">
                    <div class="aspect-square overflow-hidden">
                      <img
                        class="group-hover:scale-125 rounded-lg h-full w-full object-cover transition-all duration-300"
                        src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                        alt=""
                      />
                    </div>
                    <div class="absolute top-0 m-1 rounded-full bg-white">
                      <p class="text-[10px] rounded-full bg-black p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
                        Sale
                      </p>
                    </div>
                    <div class="mt-4 flex items-start justify-between">
                      <div class="">
                        <h3 class="text-xs font-semibold sm:text-sm md:text-base">
                          <a href="#" title="" class="cursor-pointer">
                            Arabian Musk
                            <span class="absolute" aria-hidden="true"></span>
                          </a>
                        </h3>
                        <div class="mt-2 flex items-center">
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <div class="text-right">
                        <del class="mt-px text-xs font-semibold text-gray-600 sm:text-sm">
                          {" "}
                          $79.00{" "}
                        </del>
                        <p class="text-xs font-normal sm:text-sm md:text-base">
                          $99.00
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
                <div class="group rounded-md bg-white p-2 text-left text-indigo-900 shadow-xl shadow-black/5 transition-transform hover:-translate-y-1">
                  <article class="relative">
                    <div class="aspect-square overflow-hidden">
                      <img
                        class="group-hover:scale-125 rounded-lg h-full w-full object-cover transition-all duration-300"
                        src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                        alt=""
                      />
                    </div>
                    <div class="absolute top-0 m-1 rounded-full bg-white">
                      <p class="text-[10px] rounded-full bg-black p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
                        Sale
                      </p>
                    </div>
                    <div class="mt-4 flex items-start justify-between">
                      <div class="">
                        <h3 class="text-xs font-semibold sm:text-sm md:text-base">
                          <a href="#" title="" class="cursor-pointer">
                            Arabian Musk
                            <span class="absolute" aria-hidden="true"></span>
                          </a>
                        </h3>
                        <div class="mt-2 flex items-center">
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                          <svg
                            class="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <div class="text-right">
                        <del class="mt-px text-xs font-semibold text-gray-600 sm:text-sm">
                          {" "}
                          $79.00{" "}
                        </del>
                        <p class="text-xs font-normal sm:text-sm md:text-base">
                          $99.00
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
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

export default Home2;
