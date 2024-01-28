import React, { useEffect, useState } from "react";
import "./Orders.css";
import { BsDashSquare, BsTrash3, BsPlusSquare } from "react-icons/bs";
import { PiSortAscendingBold } from "react-icons/pi";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";
import OrderRow from "./OrderRow";
import InvoiceView from "./InvoiceView";
const Orders = ({ userData }) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [viewOrderClicked, setViewOrderClicked] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [ordersClicked, settoReviewClicked] = useState(true);
  const [bookingsClicked, setReviewedClicked] = useState(false);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/user/orders",
          { user_id: userData.id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setOrders(response.data.orders);
          setBookings(response.data.bookings);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const headerClickHandler = () => {
    if (ordersClicked) {
      setReviewedClicked(true);
      settoReviewClicked(false);
    } else {
      setReviewedClicked(false);
      settoReviewClicked(true);
    }
  };
  const viewModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOutsideClick = (event) => {
    if (event.target.className === "modal") {
      setIsModalOpen(false);
    }
  };
  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };

  return (
    <React.Fragment>
      <Toaster className="notifier" />
      {isModalOpen && isInvoiceOpen && (
        <InvoiceView
          order={currentOrder}
          closeModal={() => {
            setIsModalOpen(!isModalOpen);
            setIsInvoiceOpen(!isInvoiceOpen);
          }}
        />
      )}
      <div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
        <div className="flex mt-4 mb-12 justify-between text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <a
                href="#"
                className={`${
                  ordersClicked
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : ""
                } inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-500 hover:text-blue-600`}
                onClick={() => headerClickHandler()}
              >
                Orders
              </a>
            </li>
            <li class="me-2">
              <a
                href="#"
                className={`${
                  bookingsClicked
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : ""
                } inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-500 hover:text-blue-600`}
                onClick={() => headerClickHandler()}
              >
                Bookings
              </a>
            </li>
          </ul>

          <button
            type="button"
            data-dropdown-toggle="cart-dropdown"
            class="p-2 mr-1 flex justify-end text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <span class="sr-only">View sort</span>
            <span className="text-2xl">
              <PiSortAscendingBold />
            </span>
          </button>
          {showSortDropdown && (
            <div className="absolute right-0 mr-32 mt-12 justify-end bg-white border SlideDown">
              <a
                href="#"
                class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                role="menuitem"
                tabindex="-1"
                id="menu-item-2"
                onClick={() => {
                  setShowSortDropdown(!showSortDropdown);
                }}
              >
                Newest
              </a>
              <a
                href="#"
                class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                role="menuitem"
                tabindex="-1"
                id="menu-item-3"
                onClick={() => {
                  setShowSortDropdown(!showSortDropdown);
                }}
              >
                Earliest
              </a>
            </div>
          )}
        </div>

        <div className="ordered-items">
          {ordersClicked ? (
            orders.length !== 0 ? (
              orders.map((order) => (
                <OrderRow
                  order={order}
                  invoiceClicked={() => {
                    setCurrentOrder(order);
                    setIsInvoiceOpen(!isInvoiceOpen);
                    setIsModalOpen(!isModalOpen);
                  }}
                />
              ))
            ) : (
              <div className="ordered-item">
                <div className="item-header">
                  <div className="order-info">
                    <div className="order-id">No orders available</div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="border">
              <div className="item-header">
                <div className="order-info">
                  <div className="order-id">
                    Order ID : <span>#EA512134</span>
                  </div>
                  <div className="ordered-datetime">
                    Placed on: <span>15:34, 10th Dec, 2023</span>
                  </div>
                </div>
                <div className="order-view">
                  <span>
                    <a href="#" className="user-section-btn order-invoice-btn">
                      Invoice
                    </a>
                  </span>
                  <span></span>
                </div>
              </div>
              <div class="item">
                <div class="item-column description"></div>

                <div class="">
                  <span className="delivery-status-outer">status :</span>
                  <span className="delivery-status delivered">Delivered</span>
                </div>

                <div class="item-column product-price">
                  <div>
                    <span className="delivery-status-outer">Paid : </span>
                    <span>
                      <span className="currency">$</span>
                      <span>549</span>
                    </span>
                  </div>
                </div>
                <div>
                  <span className="delivery-status-outer">
                    Payment method :
                  </span>
                  <span> Visa Card</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Orders;
