import React, { useState, useEffect } from "react";
import { FetchUser } from "../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import "./User.css";
import Sidebar from "./Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
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
import Navbar2 from "../Navbar/Navbar2";
const User = ({ ui, school }) => {
  const navigate = useNavigate();
  const [reloadCom, setReloadComp] = useState(false);
  const [userData, setUserData] = useState(null);
  const [overlayClicked, setOverlayClicked] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let tkn = localStorage.getItem("token");
        if (tkn) {
          const response = await FetchUser();
          if (response.status === 200) {
            console.log(response);
            //localStorage.setItem("user", JSON.stringify(response.data));
            setUserData(response.data);
            setReloadComp(false);
          } else {
          }
        } else {
          localStorage.clear();
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [reloadCom]);
  const sideBarstate = useSelector((state) => state.sidebar);
  let componentToView;

  if (sideBarstate.profileClicked) {
    componentToView = (
      <Profile userData={userData} reload={() => setReloadComp(true)} />
    );
  } else if (sideBarstate.ordersClicked) {
    componentToView = (
      <Orders
        userData={userData}
        overlay={() => setOverlayClicked(!overlayClicked)}
      />
    );
  } else if (sideBarstate.paymentsClicked) {
    componentToView = <PaymentSettings user={userData} />;
  } else if (sideBarstate.complaintsClicked) {
    componentToView = <Complaints user={userData} />;
  } else if (sideBarstate.reviewsClicked) {
    componentToView = <Reviews user={userData} />;
  } else if (sideBarstate.vouchersClicked) {
    componentToView = <Vouchers />;
  } else if (sideBarstate.notificationsClicked) {
    componentToView = <Notification />;
  }
  return (
    <React.Fragment>
      <div className="m-0 p-0">
        <Navbar2 overlay={overlayClicked} ui={ui} school={school} />

        <div className=" mt-16">
          <div class="mx-4  max-w-screen-xl sm:mx-8 xl:mx-auto">
            <h1 class="border-b py-6 text-2xl font-semibold">My Account</h1>
            <div class="grid grid-cols-8 pt-3 pb-10 sm:grid-cols-10">
              <Sidebar />

              <div class="col-span-8 rounded-xl sm:bg-gray-50 sm:shadow">
                {componentToView}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default User;
