import React from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../../redux/action";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sideBarstate = useSelector((state) => state.sidebar);

  const handleItemClick = (item) => {
    if (!sideBarstate[item]) {
      dispatch(setClicked(item, true));
    }
  };
  return (
    <React.Fragment>
      <aside>
        <div className="toggle">
          <div class="close" id="close-btn">
            <span>close</span>
          </div>
          <div className="sidebar">
            <a
              onClick={() => handleItemClick("profileClicked")}
              className={sideBarstate.profileClicked ? "active" : ""}
            >
              <span></span>
              <h3>Profile</h3>
            </a>
            <a
              onClick={() => handleItemClick("ordersClicked")}
              className={sideBarstate.ordersClicked ? "active" : ""}
            >
              <span></span>
              <h3>Orders</h3>
            </a>

            <a
              onClick={() => handleItemClick("paymentsClicked")}
              className={sideBarstate.paymentsClicked ? "active" : ""}
            >
              <span></span>
              <h3>Payment settings</h3>
            </a>
            <a
              onClick={() => handleItemClick("complaintsClicked")}
              className={sideBarstate.complaintsClicked ? "active" : ""}
            >
              <span></span>
              <h3>Complaints</h3>
            </a>
            <a
              onClick={() => handleItemClick("reviewsClicked")}
              className={sideBarstate.reviewsClicked ? "active" : ""}
            >
              <span></span>
              <h3>Reviews</h3>
            </a>
            <a
              onClick={() => handleItemClick("vouchersClicked")}
              className={sideBarstate.vouchersClicked ? "active" : ""}
            >
              <span></span>
              <h3>Vouchers</h3>
            </a>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
