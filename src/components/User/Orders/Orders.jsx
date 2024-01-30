import React, { useEffect, useState } from "react";
import "./Orders.css";
import { BsDashSquare, BsTrash3, BsPlusSquare } from "react-icons/bs";
import { PiSortAscendingBold } from "react-icons/pi";
import { Toaster, toast } from "react-hot-toast";
import { fetchOrders } from "../../../api/UserAPI";
import OrderRow from "./OrderRow";
import InvoiceView from "./InvoiceView";
import BookingRow from "./BookingRow";
import ReceiptView from "./ReceiptView";
import ReportView from "./ReportView";

const Orders = ({ userData, overlay }) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [ordersClicked, settoReviewClicked] = useState(true);
  const [bookingsClicked, setReviewedClicked] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userData !== null) {
        try {
          const response = await fetchOrders(userData.id);
          console.group(response);
          setOrders(response.data.orders);
          setBookings(response.data.bookings);
        } catch (error) {
          console.error(error.message);
        }
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

  const sort = (num) => {
    if (num === 0) {
      let sortedBookings = [...bookings].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      let sortedOrders = [...orders].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setOrders(sortedOrders);
      setBookings(sortedBookings);
    } else if (num === 1) {
      let sortedBookings = [...bookings].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      let sortedOrders = [...orders].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setOrders(sortedOrders);
      setBookings(sortedBookings);
    }
  };
  return (
    userData !== null && (
      <React.Fragment>
        <Toaster className="notifier" />
        {isModalOpen && isInvoiceOpen && (
          <InvoiceView
            user={userData}
            order={currentOrder}
            closeModal={() => {
              setIsModalOpen(!isModalOpen);
              setIsInvoiceOpen(!isInvoiceOpen);
              overlay();
            }}
          />
        )}
        {isModalOpen && isReceiptOpen && (
          <ReceiptView
            user={userData}
            booking={currentBooking}
            closeModal={() => {
              setIsModalOpen(!isModalOpen);
              setIsReceiptOpen(!isReceiptOpen);
              overlay();
            }}
          />
        )}
        {isModalOpen && isReportOpen && (
          <ReportView
            user={userData}
            order={currentOrder}
            closeModal={() => {
              setIsModalOpen(!isModalOpen);
              setIsReportOpen(!isReportOpen);
              overlay();
            }}
          />
        )}
        <div class="col-span-8 ViewContent overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 ">
          <div className="flex mt-4 mb-4 justify-between text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
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
                <button
                  class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-2"
                  onClick={() => {
                    setShowSortDropdown(!showSortDropdown);
                    sort(0);
                  }}
                >
                  Newest
                </button>
                <button
                  class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-3"
                  onClick={() => {
                    setShowSortDropdown(!showSortDropdown);
                    sort(1);
                  }}
                >
                  Earliest
                </button>
              </div>
            )}
          </div>

          <div class="overflow-hidden rounded-xl bg-white shadow lg:px-4">
            <table class="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              {ordersClicked ? (
                <>
                  <thead class="border-b md:hidden sm:hidden lg:table-header-group">
                    <tr class="">
                      <td class="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                        Order Date
                      </td>

                      <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Order type
                      </td>
                      <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Products
                      </td>

                      <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Price
                      </td>

                      <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Status
                      </td>
                    </tr>
                  </thead>
                  <tbody class="lg:border-gray-300">
                    {orders.length !== 0 ? (
                      orders.map((order, index) => (
                        <OrderRow
                          key={index}
                          user={userData}
                          order={order}
                          reportClicked={() => {
                            setCurrentOrder(order);
                            setIsModalOpen(!isModalOpen);
                            setIsReportOpen(!isReportOpen);
                            overlay();
                          }}
                          invoiceClicked={() => {
                            setCurrentOrder(order);
                            setIsInvoiceOpen(!isInvoiceOpen);
                            setIsModalOpen(!isModalOpen);
                            overlay();
                          }}
                        />
                      ))
                    ) : (
                      <div className="order-id">No orders available</div>
                    )}
                  </tbody>
                </>
              ) : (
                <>
                  <thead class="border-b md:hidden sm:hidden lg:table-header-group">
                    <tr class="">
                      <td class="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                        Booking Date
                      </td>

                      <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Tickets
                      </td>
                      <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Event
                      </td>

                      <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Price
                      </td>

                      <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Payment method
                      </td>
                    </tr>
                  </thead>
                  <tbody class="lg:border-gray-300">
                    {bookings.length !== 0 ? (
                      bookings.map((booking, index) => (
                        <BookingRow
                          key={index}
                          user={userData}
                          booking={booking}
                          receiptClicked={() => {
                            setCurrentBooking(booking);
                            setIsReceiptOpen(!isReceiptOpen);
                            setIsModalOpen(!isModalOpen);
                            overlay();
                          }}
                        />
                      ))
                    ) : (
                      <div className="order-id">No bookings available</div>
                    )}
                  </tbody>
                </>
              )}
            </table>
          </div>
          <div className="ordered-items"></div>
        </div>
      </React.Fragment>
    )
  );
};

export default Orders;
