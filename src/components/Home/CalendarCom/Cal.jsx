import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "./CalendarCom.css";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../../redux/action";
import { useNavigate } from "react-router-dom";
const CalendarCom = ({ events }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navBarstate = useSelector((state) => state.navbar);
  const [sliderEvents, setSliderEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [mindate, setminDate] = useState(new Date());
  const [isShowing, setIsShowing] = useState(false);
  const [sliderIsHidden, setSliderIsHidden] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  //const sliderRef = useRef(null);

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //const formattedDate = `${daysOfWeek[date.getDay()]}, ${
  //  months[date.getMonth()]
  //} ${date.getDate()}${getOrdinalSuffix(
  //  date.getDate()
  //)}, ${date.getFullYear()}`;

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  const toggleSlider = (value) => {
    setSliderEvents([]);

    let eventCount = events.length;
    for (let i = 0; i < eventCount; i++) {
      if (
        events[i].event_datetime.split(" ")[0] ===
        formatDate(value).split(" ")[0]
      ) {
        setSliderEvents((prevEvents) => [...prevEvents, events[i].event_info]);
      }
    }
    setDate(value);
    setSliderIsHidden(!sliderIsHidden);
  };

  const customTileContent = ({ date, view }) => {
    if (view === "month") {
      let eventsCount = events.length;
      for (let i = 0; i < eventsCount; i++) {
        if (
          events[i].event_datetime.split(" ")[0] ===
          formatDate(date).split(" ")[0]
        ) {
          return (
            <div className="custom-tile-content">
              <div className="red-bar"></div>
            </div>
          );
        }
      }
    }
    return null;
  };

  const handleItemClick = (item) => {
    if (!navBarstate[item]) {
      dispatch(setClicked(item, true));
    }
  };

  //useEffect(() => {
  //  const sliderTimeout = setTimeout(() => {
  //    setSliderIsHidden(false);
  //  }, 2000); // 10 seconds in milliseconds

  //  return () => clearTimeout(sliderTimeout);
  //}, [sliderIsHidden]);

  //const customTileContent = ({ date }) => {
  //  const isCurrent = isCurrentDate(date);

  // if (isCurrent) {
  //    return (
  //      <div className="custom-tile-content">
  //        <div className="red-bar"></div>
  //      </div>
  //    );
  //  } else {
  //   return null;
  //  }
  //};

  const handleEventClick = (item, id) => {
    console.log(id);
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
    <div className="mt-16">
      <div className="slider-container">
        <div className={`slider ${sliderIsHidden ? "active" : ""}`}>
          <div className="slider-current-datetime">
            <div className="text-xs font-medium text-primary-900 dark:text-primary-400">
              <span>
                {date.getDate()}
                {getOrdinalSuffix(date.getDate())} {months[date.getMonth()]},
              </span>
              <span> {date.getFullYear()}</span>
            </div>
            <div className="text-gray-600">{daysOfWeek[date.getDay()]}</div>
          </div>
          <div className="event-com-scrollable">
            {sliderEvents.length === 0 ? (
              <div class="event-com-single dark:text-white">
                <p className="text-gray-600 ">No events today</p>
              </div>
            ) : (
              sliderEvents.map((event) => (
                <div class="event-com-single mt-2" key={event.id}>
                  <div class="event-single-card">
                    <h3 class="card__content">{event}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="calendar-container">
        <Calendar
          onChange={toggleSlider}
          value={date}
          //minDate={mindate}
          tileContent={({ date, view }) => customTileContent({ date, view })}
          //tileContent={({ date }) => customTileContent({ date })}
        />
      </div>
    </div>
  );
};

export default CalendarCom;
