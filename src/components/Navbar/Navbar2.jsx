import React, { useState, useEffect } from "react";
import "./Navbar.css";
import "./SearchBar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setClicked } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import defaultImg from "../assets/default-avatar.png";
import { BsSearch } from "react-icons/bs";
import { PiShoppingCart } from "react-icons/pi";
import Notifications from "./Notifications";
import UserDropdown from "./UserDropdown";
import hologoLogo from "../assets/Hologo_logo.png";
import "./SearchBar.scss";
import SideNav from "./SideNav";
const Navbar2 = ({ overlay, ui, school }) => {
  const [colorPalette, setColorPalette] = useState({
    primary: "blue",
    border: "blue",
  });
  const dispatch = useDispatch();
  const navBarstate = useSelector((state) => state.navbar);

  const [inputValue, setInputValue] = useState("");
  const [relatedSearch, setRelatedSearch] = useState([]);
  const navigate = useNavigate();
  const [searchBarClicked, setSearchBarClicked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [notificationsClicked, setNotificationsClicked] = useState(false);
  const [userClicked, setUserClicked] = useState(false);
  const [toggleSideNav, setToggleSideNav] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [viewResults, setViewResults] = useState(false);
  const [newNotification, setNewNoticiation] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    student_id: "",
    mobile_no: "",
    email: "",
    password: "",
  });

  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (navBarstate.homeClicked) {
      navigate("/");
    } else if (navBarstate.productsClicked) {
      navigate("/products");
    } else if (navBarstate.eventsClicked) {
      navigate("/events");
    } else if (navBarstate.cartClicked) {
      navigate("/cart");
    } else if (navBarstate.userClicked) {
      navigate("/user");
    } else if (navBarstate.loginClicked) {
      navigate("/login");
    }
  }, [navBarstate, navigate]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setRelatedSearch([]);
        if (inputValue !== "") {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/search",
            {
              searchTerm: inputValue,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            setRelatedSearch(response.data);
          }
          console.log(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    handleSearch();
  }, [inputValue]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      setUserData(storedUserData);
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoResults(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleItemClick = (item) => {
    if (!navBarstate[item]) {
      dispatch(setClicked(item, true));
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setInputValue("");
    }, 400);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleProductClick = (item, id) => {
    if (!navBarstate[item]) {
      //navBarstate.productsClicked(true);
      dispatch(setClicked(item, true));
      navigate(`/product/${id}`);
    } else {
      dispatch(setClicked(item, false));
      //navBarstate.productsClicked(false);
      //navBarstate.productsClicked(true);
      dispatch(setClicked(item, true));
      navigate(`/product/${id}`);
    }
  };

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
      <nav className="flex py-2 justify-between px-32 items-center bg-white ">
        <div className="w-12 w-12 flex">
          <img
            src={`http://127.0.0.1:8080/api/super/getlogo/${school.logo_id}`}
            alt="School logo"
            className="max-w-100"
          />
          <span className="m-3 text-gray-600">{school.name}</span>
        </div>

        <div className="w-12 w-12 flex">
          <img src={hologoLogo} alt="Skooler Logo" className="max-w-100" />
        </div>
      </nav>
      <header
        className={`bg-white fixed shadow-md rounded-xl py-2 top-0 w-full ${
          isSticky
            ? `bg-white border border-b-1 border-${ui.secondary_clr} SlideDown`
            : `top-16 text-${ui.secondary_clr} border`
        } ${overlay ? "" : "z-50"}`}
      >
        <div
          className={`${
            overlay ? "opacity-40" : ""
          } relative flex max-w-screen-xl flex-col overflow-hidden py-1 md:mx-auto md:flex-row md:items-center`}
        >
          <span
            href="#"
            class="flex cursor-pointer items-center whitespace-nowrap font-normal font-black"
          >
            <div
              className={`${
                navBarstate.loginClicked ? "hidden" : ""
              } searchbar-container flex justify-center text-sm flex-grow relative`}
            >
              <input
                id="searchBar"
                class="searchbar"
                type="text"
                placeholder="Search"
                value={inputValue}
                onFocus={() => {
                  setSearchBarClicked(true);
                  setViewResults(true);
                }}
                onBlur={() => {
                  setSearchBarClicked(false);
                  handleBlur();
                  //setViewResults(false);
                }}
                onChange={handleInputChange}
              />
              <a
                id="btnSearch"
                class={`btn-search ${
                  searchBarClicked ? "visible text-sm" : "hidden"
                }`}
              >
                <i class="fa fa-search">
                  <BsSearch />
                </i>
              </a>
              {inputValue !== "" && (
                <div class="SlideDown z-50 fixed resoult-tab font-normal resoult-tab-active">
                  {relatedSearch.length !== 0 ? (
                    navBarstate.eventsClicked ? (
                      <div className="ul overflow-y-auto">
                        <div className="ul-title">
                          <p>Related events</p>
                        </div>
                        {relatedSearch.event_result.map((event) => (
                          <div
                            className="li cursor-pointer"
                            key={event.id}
                            onClick={() => {
                              handleEventClick("eventViewClicked", event.id);
                            }}
                          >
                            <div className="li-icon">
                              <i data-feather="clipboard" className="icon"></i>
                            </div>
                            <div>
                              <div className="li-text">{event.event_name}</div>
                              <div className="text-gray-400 text-xs">
                                To be held on : {event.event_datetime}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="ul-title">
                          <p>Related products</p>
                        </div>
                        {relatedSearch.product_results.map((product) => (
                          <div
                            className="li cursor-pointer"
                            key={product.id}
                            onClick={() => {
                              handleProductClick(
                                "productViewClicked",
                                product.id
                              );
                            }}
                          >
                            <div className="li-icon">
                              <i data-feather="clipboard" className="icon"></i>
                            </div>
                            <div className="li-text cursor-pointer">
                              {product.name}
                            </div>
                            <div className="text-gray-400 text-xs ml-4">
                              {product.colour !== null ? product.colour : ""}
                              {" | " + product.size !== null
                                ? product.size
                                : ""}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="ul overflow-y-auto">
                        <div className="ul-title">
                          <p>Related products</p>
                        </div>
                        {relatedSearch.product_results.map((product) => (
                          <div
                            className="li cursor-pointer"
                            key={product.id}
                            onClick={() => {
                              handleProductClick(
                                "productViewClicked",
                                product.id
                              );
                            }}
                          >
                            <div className="li-icon">
                              <i data-feather="clipboard" class="icon"></i>
                            </div>
                            <div className="li-text cursor-pointer">
                              {product.name}
                            </div>
                            <div className="text-gray-400 text-xs ml-4">
                              {product.colour !== null ? product.colour : ""}
                              {" | " + product.size !== null
                                ? product.size
                                : ""}
                            </div>
                          </div>
                        ))}
                        <div className="ul-title">
                          <p>Related events</p>
                        </div>
                        {relatedSearch.event_result.map((event) => (
                          <div
                            className="li cursor-pointer"
                            key={event.id}
                            onClick={() => {
                              handleEventClick("eventViewClicked", event.id);
                            }}
                          >
                            <div className="li-icon">
                              <i data-feather="clipboard" className="icon"></i>
                            </div>
                            <div>
                              <div className="li-text">{event.event_name}</div>
                              <div className="text-gray-400 text-xs">
                                To be held on : {event.event_datetime}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    <div className="ul">
                      <p className="text-gray-500 ml-10 mt-5">
                        No results found
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </span>
          <input type="checkbox" class="peer hidden" id="navbar-open" />
          <label
            class="absolute top-3 right-7 cursor-pointer md:hidden"
            for="navbar-open"
          >
            <span class="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            class="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start"
          >
            <ul class="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
              <div class="cl-effect-5">
                <a
                  href="#"
                  onClick={() => handleItemClick("homeClicked")}
                  className={
                    navBarstate.homeClicked
                      ? "active_nav active_nav_border"
                      : ""
                  }
                >
                  <span data-hover="Home">Home</span>
                </a>

                <a
                  href="#"
                  onClick={() => handleItemClick("productsClicked")}
                  className={
                    navBarstate.productsClicked
                      ? "active_nav active_nav_border"
                      : ""
                  }
                >
                  <span data-hover="Products">Products</span>
                </a>
                <a
                  href="#"
                  onClick={() => handleItemClick("eventsClicked")}
                  className={
                    navBarstate.eventsClicked
                      ? "active_nav active_nav_border"
                      : ""
                  }
                >
                  <span data-hover="Events">Events</span>
                </a>
              </div>

              {loggedIn ? (
                <li class="md:mr-12  py-2 flex">
                  <button
                    type="button"
                    data-dropdown-toggle="cart-dropdown"
                    class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => handleItemClick("cartClicked")}
                  >
                    <span class="sr-only">View cart</span>
                    <span className="text-xl">
                      <PiShoppingCart />
                    </span>
                  </button>
                  <button
                    type="button"
                    data-dropdown-toggle="notification-dropdown"
                    class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => {
                      setNotificationsClicked(!notificationsClicked);
                      setUserClicked(false);
                    }}
                  >
                    <span class="sr-only">View notifications</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 14 20"
                    >
                      <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                    </svg>
                    {newNotification && (
                      <div class="absolute mx-1.5 my-0.5 h-1.5 w-1.5 rounded-full bg-orange-400 me-2"></div>
                    )}
                  </button>
                  <div
                    className={`top-32 mt-2 right-0 mr-12 ${
                      notificationsClicked ? "fixed z-10" : "hidden"
                    }`}
                  >
                    <Notifications
                      close={() =>
                        setNotificationsClicked(!notificationsClicked)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    class="flex mx-1 text-sm bg-white rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown"
                    onClick={() => {
                      setNotificationsClicked(false);
                      setUserClicked(!userClicked);
                    }}
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-7 h-7 mt-1 rounded-full"
                      src={defaultImg}
                      alt="user photo"
                    />
                  </button>
                  {userClicked && (
                    <div
                      className={` ${
                        userClicked ? "fixed mt-12 z-10" : "hidden"
                      }`}
                    >
                      <UserDropdown userData={userData} />
                    </div>
                  )}
                </li>
              ) : (
                <li>
                  <button
                    className={`rounded-full border-2 border-${ui.secondary_clr} px-6 py-1 text-${ui.secondary_clr} transition-colors hover:bg-${ui.secondary_clr} hover:text-white`}
                    onClick={() => {
                      handleEventClick("loginClicked");
                    }}
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
};
export default Navbar2;
