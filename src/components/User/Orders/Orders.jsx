import React, { useEffect, useState } from "react";
import "./Orders.css";
import { BsDashSquare, BsTrash3, BsPlusSquare } from "react-icons/bs";
import { PiSortAscendingBold } from "react-icons/pi";
import { Toaster, toast } from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";
import html2pdf from "html2pdf.js";
const Orders = () => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const downloadInvoice = () => {
    const content = document.querySelector(".invoice");

    html2pdf(content, {
      margin: 10,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
  };

  return (
    <React.Fragment>
      <Toaster className="notifier" />
      {isModalOpen && (
        <div className="modal" onClick={handleOutsideClick}>
          <Toaster className="notifier" />
          <div
            className="h-100 mt-24 overflow-auto"
            onClick={handleOutsideClick}
          >
            <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center">
                  <div class="text-gray-700 font-semibold text-lg">Skooler</div>
                </div>
                <div class="flex items-center justify-betweentext-gray-700">
                  <div
                    class="download flex items-center justify-between mr-5 cursor-pointer text-gray-500 hover:text-gray-800"
                    onClick={downloadInvoice}
                  >
                    <FaDownload />
                  </div>
                  <div>
                    <span className="close" onClick={viewModal}>
                      &times;
                    </span>
                  </div>
                </div>
              </div>
              <div className="invoice ">
                <div class="flex items-center justify-between mb-8">
                  <div class="flex items-center">
                    <div class="text-gray-700 font-semibold text-lg">
                      School logo
                    </div>
                  </div>
                  <div class="text-gray-700">
                    <div class="font-bold text-xl mb-2">INVOICE</div>
                    <div class="text-sm">Date: 01/05/2023</div>
                    <div class="text-sm">Invoice #: INV12345</div>
                  </div>
                </div>
                <div class="border-b-2 border-gray-300 pb-8 mb-8">
                  <h2 class="text-2xl font-bold mb-4">Bill To:</h2>
                  <div class="text-gray-700 mb-2">John Doe</div>
                  <div class="text-gray-700 mb-2">123 Main St.</div>
                  <div class="text-gray-700 mb-2">Anytown, USA 12345</div>
                  <div class="text-gray-700">johndoe@example.com</div>
                </div>
                <table class="w-full text-left mb-8">
                  <thead>
                    <tr>
                      <th class="text-gray-700 font-bold uppercase py-2">
                        Description
                      </th>
                      <th class="text-gray-700 font-bold uppercase py-2">
                        Quantity
                      </th>
                      <th class="text-gray-700 font-bold uppercase py-2">
                        Price
                      </th>
                      <th class="text-gray-700 font-bold uppercase py-2">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="py-4 text-gray-700">Product 1</td>
                      <td class="py-4 text-gray-700">1</td>
                      <td class="py-4 text-gray-700">$100.00</td>
                      <td class="py-4 text-gray-700">$100.00</td>
                    </tr>
                    <tr>
                      <td class="py-4 text-gray-700">Product 2</td>
                      <td class="py-4 text-gray-700">2</td>
                      <td class="py-4 text-gray-700">$50.00</td>
                      <td class="py-4 text-gray-700">$100.00</td>
                    </tr>
                  </tbody>
                </table>
                <div class="flex justify-end mb-8">
                  <div class="text-gray-700 mr-2">Subtotal:</div>
                  <div class="text-gray-700">$425.00</div>
                </div>
                <div class="text-right mb-8">Delivery charge : 25.50</div>
                <div class="flex justify-end mb-8">
                  <div class="text-gray-700 mr-2">Total:</div>
                  <div class="text-gray-700 font-bold text-xl">$450.50</div>
                </div>
                <div class="border-t-2 border-gray-300 pt-8 mb-8 text-gray-500">
                  This is a system generated invoice
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="orders-component">
        <div className="orders-container">
          <div className="list-header">
            <div className="products-header">
              <div className="flex justify-between w-full">
                <div className=" text-xl font-semibold ml-10">
                  <h2 className="text-gray-600">My orders</h2>
                </div>
                <div className="text-2xl mr-10">
                  <button
                    type="button"
                    data-dropdown-toggle="cart-dropdown"
                    class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <span class="sr-only">View sort</span>
                    <span className="text-2xl">
                      <PiSortAscendingBold />
                    </span>
                  </button>
                  {showSortDropdown && (
                    <div className="Sort-dropdown-content">
                      <ul>
                        <li>Recent</li>
                        <li>Earliest</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <hr class="border-gray-300 mb-5 mt-5" />
          </div>
          <div className="ordered-items">
            <div className="ordered-item">
              <div className="item-header">
                <div className="order-info">
                  <div className="order-id">
                    Order ID : <span>#EA55565</span>
                  </div>
                  <div className="ordered-datetime">
                    Placed on: <span>14:34, 09th Dec, 2023</span>
                  </div>
                </div>
                <div className="order-view">
                  <span>
                    <a
                      href="#"
                      className="user-section-btn order-invoice-btn"
                      onClick={viewModal}
                    >
                      Invoice
                    </a>
                  </span>
                  <span></span>
                </div>
              </div>
              <div class="item">
                <div class="item-column image">
                  <img alt="img" />
                </div>

                <div class="item-column description">
                  <span>Common P</span>
                  <span>Bball High</span>
                  <span>White</span>
                </div>

                <div class="">
                  <span className="delivery-status-outer">status :</span>
                  <span className="delivery-status">Pending</span>
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
            <div className="ordered-item">
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
                <div class="item-column image">
                  <img alt="img" />
                </div>

                <div class="item-column description">
                  <span>Common P</span>
                  <span>Bball High</span>
                  <span>White</span>
                </div>

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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Orders;
