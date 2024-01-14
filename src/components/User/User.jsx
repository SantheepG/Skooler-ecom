import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./User.css";
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Profile from "./Profile/Profile";
import Orders from "./Orders/Orders";
import PaymentSettings from "./PaymentSettings/PaymentSettings";
import Complaints from "./Complaints/Complaints";
import Reviews from "./Reviews/Reviews";
import Notification from "./Notification/Notification";
import Vouchers from "./Vouchers/Vouchers";

import { Toaster, toast } from "react-hot-toast";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
const User = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({
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
    } else {
      navigate("/");
    }
  }, []);
  const sideBarstate = useSelector((state) => state.sidebar);
  let componentToView;

  if (sideBarstate.profileClicked) {
    componentToView = <Profile userData={userData} />;
  } else if (sideBarstate.ordersClicked) {
    componentToView = <Orders />;
  } else if (sideBarstate.paymentsClicked) {
    componentToView = <PaymentSettings />;
  } else if (sideBarstate.complaintsClicked) {
    componentToView = <Complaints />;
  } else if (sideBarstate.reviewsClicked) {
    componentToView = <Reviews />;
  } else if (sideBarstate.vouchersClicked) {
    componentToView = <Vouchers />;
  } else if (sideBarstate.notificationsClicked) {
    componentToView = <Notification />;
  }
  return (
    <React.Fragment>
      <div className="main-screen-container">
        <div className="navbar-header-container">
          <Navbar />
        </div>
        <div className="skooler-main-container">
          <div className="content">
            <div className="main-panel">
              <div className="left-side">
                <Sidebar />
              </div>
              <div className="right-side">{componentToView}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default User;
