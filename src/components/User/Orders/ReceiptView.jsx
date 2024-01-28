import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa6";
import html2pdf from "html2pdf.js";

const ReceiptView = ({ user, booking, closeModal }) => {
  const getFormattedDate = (timestamp) => {
    if (timestamp !== null) {
      const datePart = timestamp.split("T")[0];
      const timePart = timestamp.split("T")[1].split(".")[0];

      const datetime = `${datePart} ${timePart}`;

      return datetime;
    }
    return null;
  };

  const downloadInvoice = () => {
    const content = document.querySelector(".e-receipt");
    html2pdf(content, {
      margin: 10,
      filename: "e-receipt.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
  };
  return (
    <React.Fragment>
      <div className="modal ViewContent">
        <div className="h-100 mt-24 overflow-auto">
          <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="text-gray-700 font-semibold text-lg">Skooler</div>
              </div>
              <div class="flex items-center justify-betweentext-gray-700">
                <div
                  class="download flex items-center justify-between mr-5 cursor-pointer text-gray-500 hover:text-gray-800"
                  onClick={() => downloadInvoice()}
                >
                  <FaDownload />
                </div>
                <div>
                  <span className="close" onClick={() => closeModal()}>
                    &times;
                  </span>
                </div>
              </div>
            </div>
            <div className="e-receipt">
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center">
                  <div class="text-gray-700 font-semibold text-lg">
                    School logo
                  </div>
                </div>
                <div class="text-gray-700">
                  <div class="font-bold text-xl mb-2">E-Receipt</div>
                  <div class="text-sm">
                    Date:{" "}
                    {booking.created_at !== null
                      ? getFormattedDate(booking.created_at)
                      : null}
                  </div>
                  <div class="text-sm">Booking ID #: {booking.id}</div>
                </div>
              </div>
              <div class="border-b-2 border-gray-300 pb-8 mb-8">
                <h2 class="text-2xl font-bold mb-4"></h2>
                <div class="text-gray-700 mb-2">
                  {user.first_name + " "}
                  {user.last_name !== null ? user.last_name : ""}{" "}
                </div>

                <div class="text-gray-700">{user.email}</div>
                <div class="text-gray-700 mb-2">{user.mobile_no}</div>
              </div>
              <table class="w-full text-left mb-8">
                <thead>
                  <tr>
                    <th class="text-gray-700 font-bold uppercase py-2">
                      Event
                    </th>
                    <th class="text-gray-700 font-bold uppercase py-2">paid</th>

                    <th class="text-gray-700 font-bold uppercase py-2">
                      tickets
                    </th>
                    <th class="text-gray-700 font-bold uppercase py-2">
                      Payment method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="py-4 text-gray-700">{booking.event_name}</td>
                    <td class="py-4 text-gray-700">${booking.paid}</td>

                    <td class="py-4 text-gray-700">{booking.tickets}</td>
                    <td class="py-4 text-gray-700">{booking.payment_method}</td>
                  </tr>
                </tbody>
              </table>
              <div class="flex justify-end mb-2"></div>
              <div class="border-t-2 border-gray-300 pt-8 mb-2 text-gray-500"></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ReceiptView;
