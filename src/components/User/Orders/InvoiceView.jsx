import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa6";
import html2pdf from "html2pdf.js";

const InvoiceView = ({ user, order, closeModal }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const ParseProducts = () => {
      if (order !== null) {
        let products = JSON.parse(order.products);
        setProducts(products);
      }
    };
    ParseProducts();
  }, [order]);

  const getFormattedDate = (timestamp) => {
    if (timestamp !== null) {
      const datePart = timestamp.split("T")[0];
      //const timePart = timestamp.split("T")[1].split(".")[0];

      const datetime = `${datePart}`;

      return datetime;
    }
    return null;
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
      <div className="modal ViewContent z-50">
        <div className="h-100 mt-8 overflow-auto">
          <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
            <div class="flex items-center justify-between mb-8">
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
            <div className="invoice ">
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center">
                  <div class="text-gray-700 font-semibold text-lg">
                    School logo
                  </div>
                </div>
                <div class="text-gray-700">
                  <div class="font-bold text-xl mb-2">INVOICE</div>
                  <div class="text-sm">
                    Date:{" "}
                    {order.created_at !== null
                      ? getFormattedDate(order.created_at)
                      : null}
                  </div>
                  <div class="text-sm">Invoice #: {order.id}</div>
                </div>
              </div>
              <div class="border-b-2 border-gray-300 pb-8 mb-8">
                <h2 class="text-2xl font-bold mb-4">Bill To:</h2>
                <div class="text-gray-700 mb-2">
                  {user.first_name + " "}
                  {user.last_name !== null ? user.last_name : ""}{" "}
                </div>
                <div class="text-gray-700 mb-2">{order.dispatch_address}</div>

                <div class="text-gray-700">{user.email}</div>
                <div class="text-gray-700 mb-2">{user.mobile_no}</div>
              </div>
              <table class="w-full text-left mb-8">
                <thead>
                  <tr>
                    <th class="text-gray-700 font-bold uppercase py-2">Name</th>
                    <th class="text-gray-700 font-bold uppercase py-2">
                      Price
                    </th>

                    <th class="text-gray-700 font-bold uppercase py-2">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length !== 0
                    ? products.map((product, index) => (
                        <tr key={index}>
                          <td class="py-4 text-gray-700">{product.name}</td>
                          <td class="py-4 text-gray-700">${product.price}</td>

                          <td class="py-4 text-gray-700">{product.qty}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
              <div class="flex justify-end mb-8">
                <div class="text-gray-700 mr-2">Total:</div>
                <div class="text-gray-700 font-bold text-xl">
                  ${order.total_price}
                </div>
              </div>
              <div class="border-t-2 border-gray-300 pt-8 mb-8 text-gray-500">
                This is a system generated invoice
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default InvoiceView;
