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
import SearchSuggestions from "./SearchSuggestions";
import SearchBar from "./SearchBar";
import SideNav from "./SideNav";
const Navbar = () => {
  const dispatch = useDispatch();
  const navBarstate = useSelector((state) => state.navbar);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [relatedSearch, setRelatedSearch] = useState([]);
  const navigate = useNavigate();
  const [searchBarClicked, setSearchBarClicked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [notificationsClicked, setNotificationsClicked] = useState(false);
  const [userClicked, setUserClicked] = useState(false);
  const [toggleSideNav, setToggleSideNav] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    student_id: "",
    mobile_no: "",
    email: "",
    password: "",
  });

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

    // Clear the timeout if the component unmounts before the delay
    return () => clearTimeout(timer);
  }, []);

  const handleItemClick = (item) => {
    if (!navBarstate[item]) {
      dispatch(setClicked(item, true));
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <React.Fragment>
      <header>
        <div>
          <nav class="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div class="flex justify-between items-center max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-2">
              <div className="flex-none">
                {" "}
                <a
                  href="https://flowbite.com/"
                  class="flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <span class="text-gray-500 self-center text-2xl font-semibold whitespace-nowrap dark:text-white w-10">
                    Skool logo
                  </span>
                </a>
              </div>

              <div class="searchbar-container">
                <input
                  id="searchBar"
                  class="searchbar"
                  type="text"
                  placeholder="Search"
                  value={inputValue}
                  onFocus={() => {
                    setSearchBarClicked(true);
                    setIsFocused(true);
                  }}
                  onBlur={() => {
                    setSearchBarClicked(false);
                    handleBlur();
                  }}
                  onChange={handleInputChange}
                />
                <a
                  id="btnSearch"
                  class={`btn-search ${
                    searchBarClicked ? "visible" : "hidden"
                  }`}
                >
                  <i class="fa fa-search">
                    <BsSearch />
                  </i>
                </a>
                {inputValue !== "" && (
                  <div class="SlideDown absolute mt-20 resoult-tab resoult-tab-active">
                    {relatedSearch.length !== 0 ? (
                      navBarstate.eventsClicked ? (
                        <div className="ul overflow-y-auto">
                          <div class="ul-title">
                            <p>Related events</p>
                          </div>
                          {relatedSearch.event_result.map((event) => (
                            <div class="li" key={event.id}>
                              <div class="li-icon">
                                <i data-feather="clipboard" class="icon"></i>
                              </div>
                              <div class="li-text">{event.event_info}</div>
                            </div>
                          ))}
                          <div class="ul-title">
                            <p>Related products</p>
                          </div>
                          {relatedSearch.product_results.map((product) => (
                            <div class="li" key={product.products_id}>
                              <div class="li-icon">
                                <i data-feather="clipboard" class="icon"></i>
                              </div>
                              <div class="li-text">{product.name}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="ul overflow-y-auto">
                          <div class="ul-title">
                            <p>Related products</p>
                          </div>
                          {relatedSearch.product_results.map((product) => (
                            <div class="li" key={product.products_id}>
                              <div class="li-icon">
                                <i data-feather="clipboard" class="icon"></i>
                              </div>
                              <div class="li-text">{product.name}</div>
                            </div>
                          ))}
                          <div class="ul-title">
                            <p>Related events</p>
                          </div>
                          {relatedSearch.event_result.map((event) => (
                            <div class="li" key={event.id}>
                              <div class="li-icon">
                                <i data-feather="clipboard" class="icon"></i>
                              </div>
                              <div class="li-text">{event.event_info}</div>
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

              <div className="flex-none self-center text-2xl font-semibold whitespace-nowrap dark:text-white w-10 text-gray-500">
                Skooler
              </div>
            </div>
          </nav>
        </div>
        <nav class="absolute w-full bg-white border-gray-200 px4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div class="flex flex-wrap justify-between items-center">
            <div class="flex justify-start items-center">
              <button
                id="toggleSidebar"
                aria-expanded="true"
                aria-controls="sidebar"
                class="lg:hidden p-2 mr-3 text-gray-600 rounded cursor-pointer inline-block hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => setToggleSideNav(!toggleSideNav)}
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h14M1 6h14M1 11h7"
                  />
                </svg>
              </button>

              <div className="mx-20 lg:block ">
                <div class="cl-effect-5 ">
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
              </div>
            </div>

            {loggedIn ? (
              <div class="flex items-center lg:order-2 mx-10">
                <button
                  type="button"
                  data-dropdown-toggle="cart-dropdown"
                  class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={() => handleItemClick("cartClicked")}
                >
                  <span class="sr-only">View cart</span>
                  <span className="text-2xl">
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
                    class="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 14 20"
                  >
                    <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                  </svg>
                </button>

                <button
                  type="button"
                  class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
                    class="w-8 h-8 rounded-full"
                    src={defaultImg}
                    alt="user photo"
                  />
                </button>
              </div>
            ) : (
              <button
                class="mr-20 bg-transparent hover:bg-orange-400 text-orange-400 font-semibold hover:text-white py-2 px-4 border border-orange-300 hover:border-transparent rounded"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            )}
          </div>
        </nav>
        <div
          className={`top-20 right-0 mt-12 mr-12 ${
            notificationsClicked ? "fixed z-10" : "hidden"
          }`}
        >
          <Notifications />
        </div>
        <div
          className={`top-20 my-12 right-0 mr-7 ${
            userClicked ? "fixed z-10" : "hidden"
          }`}
        >
          <UserDropdown userData={userData} />
        </div>
        <div className={toggleSideNav ? "my-20 absolute" : "hidden"}>
          <SideNav />
        </div>
      </header>
    </React.Fragment>
  );
};
export default Navbar;
