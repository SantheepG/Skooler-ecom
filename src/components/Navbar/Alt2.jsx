import React, { useState, useEffect } from "react";
import "./Navbar.css";

import { BsBell, BsCart3, BsPersonCircle, BsSearch } from "react-icons/bs";
const Navbar = () => {
  const [searchBarClicked, setSearchBarClicked] = useState(false);
  const [svgContent, setSvgContent] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    // Fetch the SVG content from the URL
    fetch("https://icons8.com/icon/sZD6xImn4Ulx/bell")
      .then((response) => response.text())
      .then((data) => {
        setSvgContent(data); // Set the fetched SVG content to state
      })
      .catch((error) => {
        console.error("Error fetching SVG:", error);
      });
  }, []);
  return (
    <React.Fragment>
      <nav>
        <div className="top-nav">
          <div className="school-logo-container">
            {" "}
            <a href="#" class="navbar__logo">
              <h2>School logo</h2>
            </a>
          </div>
          <div className="skooler-logo-container">
            {" "}
            <a href="#" class="navbar__logo">
              <h2>Skooler</h2>
            </a>
          </div>
        </div>
        <div className="bottom-nav">
          <div className="left-nav">
            <div>
              <div class="cl-effect-5">
                <a href="#">
                  <span data-hover="Home">Home</span>
                </a>
                <a href="#">
                  <span data-hover="Products">Products</span>
                </a>
                <a href="#">
                  <span data-hover="Events">Events</span>
                </a>
              </div>
            </div>
          </div>
          <div className="center-nav searchbar-container">
            {" "}
            <input
              id="searchBar"
              class="searchbar"
              type="text"
              placeholder="Search"
              onFocus={() => {
                setSearchBarClicked(true);
              }}
              onBlur={() => {
                setSearchBarClicked(false);
              }}
            />
            <a
              id="btnSearch"
              class={`btn-search ${searchBarClicked ? "visible" : "hidden"}`}
            >
              <i class="fa fa-search">
                <BsSearch />
              </i>
            </a>
          </div>
          <div className="right-nav">
            {loggedIn ? (
              <div class="cl-effect-5 nav-right-icons">
                <a href="#">
                  <span data-hover="0">
                    <BsBell />
                  </span>
                </a>
                <a href="#">
                  <span data-hover="0">
                    <BsCart3 />
                  </span>
                </a>
                <a href="#">
                  <span data-hover="Home">
                    <BsPersonCircle />
                  </span>
                </a>
              </div>
            ) : (
              <div>
                <button className="button-77">Login</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
