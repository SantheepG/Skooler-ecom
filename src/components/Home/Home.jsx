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

import { useNavigate } from "react-router-dom";
import { setClicked } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        <div class="relative">
          <img
            src="https://cdn.forumcomm.com/dims4/default/9e69d9f/2147483647/strip/false/crop/4755x2675+0+141/resize/1200x675!/quality/90/?url=https%3A%2F%2Fforum-communications-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fef%2F01%2Fdde07d5540038af08eea80820ea6%2Fannouncement-graphic-2.jpg"
            class="absolute inset-0 h-full w-full object-cover"
            alt=""
          />
          <div class="relative bg-emerald-700 bg-opacity-90">
            <svg
              class="absolute inset-x-0 -bottom-1 text-white"
              viewBox="0 0 1160 163"
            >
              <path
                fill="currentColor"
                d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
              ></path>
            </svg>
            <div class="relative mx-auto overflow-hidden px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
              <div class="flex flex-col items-center justify-between xl:flex-row">
                <div class="mb-12 w-full max-w-xl xl:mb-0 xl:w-7/12 xl:pr-16">
                  <h2 class="mb-6 max-w-lg font-sans text-xl font-bold tracking-tight text-white sm:text-2xl sm:leading-none">
                    Announcment
                  </h2>
                  <p class="mb-4 max-w-xl text-base text-gray-200 md:text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt laudantium rem molestiae.
                  </p>
                </div>
                <div class="w-full max-w-xl xl:w-5/12 xl:px-24">
                  <div class="overflow-hidden rounded-xl border-t-4 border-emerald-600 bg-white p-7 shadow-sm shadow-emerald-300 sm:p-4">
                    <CalendarCom events={events} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section class="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
          <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-md text-center">
              <h2 class="text-xl sm:text-3xl">Featured products</h2>
            </div>

            <div class="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
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

              <article class="relative">
                <div class="aspect-square overflow-hidden">
                  <img
                    class="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                    src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>
                <div class="mt-4 flex items-start justify-between">
                  <div class="">
                    <h3 class="text-xs font-semibold sm:text-sm md:text-base">
                      <a href="#" title="" class="cursor-pointer">
                        Albanian Essence
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
                    </div>
                  </div>

                  <div class="text-right">
                    <p class="text-xs font-normal sm:text-sm md:text-base">
                      $299.00
                    </p>
                  </div>
                </div>
              </article>

              <article class="relative">
                <div class="aspect-square overflow-hidden">
                  <img
                    class="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                    src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>
                <div class="mt-4 flex items-start justify-between">
                  <div class="">
                    <h3 class="text-xs font-semibold sm:text-sm md:text-base">
                      <a href="#" title="" class="cursor-pointer">
                        Siberian Perfum
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
                    </div>
                  </div>

                  <div class="text-right">
                    <p class="text-xs font-normal sm:text-sm md:text-base">
                      $49.00
                    </p>
                  </div>
                </div>
              </article>

              <article class="relative">
                <div class="aspect-square overflow-hidden">
                  <img
                    class="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                    src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>
                <div class="mt-4 flex items-start justify-between">
                  <div class="">
                    <h3 class="text-xs font-semibold sm:text-sm md:text-base">
                      <a href="#" title="" class="cursor-pointer">
                        Danish Levoune
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
                    <p class="text-xs font-normal sm:text-sm md:text-base">
                      $79.00
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section class="bg-white py-6 sm:py-8 lg:py-12">
          <div class="mx-auto max-w-screen-xl px-4 md:px-8">
            <div class="mb-10 md:mb-16">
              <h2 class="mb-4 text-center text-xl  text-gray-800 md:mb-6 lg:text-3xl">
                Recent events
              </h2>
            </div>

            <div class="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
              {events.length !== 0 &&
                events.map((event, index) => (
                  <article class="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                    <a
                      href="#"
                      class="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
                      key={index}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        loading="lazy"
                        alt=""
                        class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                      />
                    </a>

                    <div class="flex flex-col gap-2">
                      <span class="text-sm text-gray-400">
                        {formatDate(event.event_datetime)}
                      </span>

                      <h2 class="text-xl font-bold text-gray-800">
                        <a
                          href="#"
                          class="transition duration-100 hover:text-rose-500 active:text-rose-600"
                        >
                          {event.event_name}
                        </a>
                      </h2>

                      <p class="text-gray-500">{event.event_info}</p>

                      <div>
                        <a
                          href="#"
                          class="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700"
                          onClick={() =>
                            viewEvent("eventViewClicked", event.id)
                          }
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
