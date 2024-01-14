import React, { useState } from "react";
import "./Complaints.css";
import {
  BsDashSquare,
  BsTrash3,
  BsPlusSquare,
  BsTrash3Fill,
  BsTrashFill,
} from "react-icons/bs";
import { PiSortAscendingBold } from "react-icons/pi";
const Complaints = () => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  return (
    <React.Fragment>
      <div className="complaints-component">
        <div className="list-header">
          <div className="products-header">
            <div className="flex justify-between w-full">
              <div className=" text-xl font-semibold ml-10">
                <h2 className="text-gray-600">Complaints</h2>
              </div>
            </div>
          </div>
          <hr class="border-gray-300 mb-5 mt-5" />
        </div>
        <div className="ordered-items">
          <div className="ordered-item">
            <div className="item-header">
              <div className="order-info">
                <div className="order-id">Order ID : </div>
                <div className="lodged-datetime">
                  <span>Lodged on </span>
                  <span className="lodged-datetime-inner"></span>
                </div>
              </div>
              <div className="complaint-delete">
                <span class="delete-btn">
                  <BsTrash3 />
                </span>

                <span></span>
              </div>
            </div>
            <div class="complained-item">
              <div class="item-column image">
                <img alt="img" />
              </div>

              <div class="item-column description">
                Bball
                Highdfsvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
              </div>

              <div class="complaint-status">
                <span className="complaint-status-outer">status :</span>
                <span className="complaint-status-inner">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Complaints;
