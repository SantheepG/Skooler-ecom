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

const Home = () => {
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

  return (
    <React.Fragment>
      <div className="main-screen-container">
        <div className="navbar-header-container border-b">
          <Navbar2 />
        </div>
        <div className="skooler-main-container">
          <div className="content">
            <div class="row">
              <div class="leftcolumn">
                <div class="mx-16">
                  <Extra />
                </div>
              </div>
              <div class="rightcolumn">
                <div class="card">
                  <span className="home-heading ">School calendar</span>
                  <div class="calendar-component">
                    <CalendarCom events={events} />
                  </div>
                </div>
                <div class="card">
                  <span className="home-heading ">Upcoming events</span>
                  <EventCom events={events} />
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

export default Home;
