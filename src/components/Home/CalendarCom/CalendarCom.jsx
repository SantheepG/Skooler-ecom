import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "./CalendarCom.css";
import "react-calendar/dist/Calendar.css";

const CalendarCom = ({ events }) => {
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

  return (
    <div className="calendar">
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

                    <div class="card__arrow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="15"
                        width="15"
                      >
                        <path
                          fill="#fff"
                          d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
                        ></path>
                      </svg>
                    </div>
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
