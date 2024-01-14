import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };
  return (
    <React.Fragment>
      <nav class="">
        <div class="navbar navbar-container red topBotomBordersOut">
          <div class="navbar-left">
            <h2>Skooler</h2>
          </div>
          <div class="navbar-center">
            <a alt="PORTFOLIO">Portfolio</a>
            <a alt="ABOUT">about</a>
          </div>
          <div class="navbar-right">
            <a alt="CONTACT">Contact</a>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
