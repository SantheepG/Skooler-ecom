import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./User.css";
import Sidebar from "./Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { setClicked } from "../../redux/action";
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
  const dispatch = useDispatch();
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
    componentToView = <Orders userData={userData} />;
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
        <div className="skooler-main-container mt-16">
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <aside
            id="default-sidebar"
            class="fixed top-36 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div class="h-full px-3 py-4 dark:bg-gray-800">
              <Sidebar />
            </div>
          </aside>

          <div class="p-4 sm:ml-64">
            <div class="p-2 rounded-lg dark:border-gray-700">
              {componentToView}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default User;
