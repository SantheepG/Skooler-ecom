import React, { useState, useEffect } from "react";
import { MdOutlineReport } from "react-icons/md";
const OrderRow = ({ user, order, invoiceClicked, reportClicked }) => {
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
      const timePart = timestamp.split("T")[1].split(".")[0];

      const datetime = `${datePart} ${timePart}`;

      return datetime;
    }
    return null;
  };

  return (
    <React.Fragment>
      <tr class="w-full border-b rounded">
        <td class="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
          {order.created_at !== null
            ? getFormattedDate(order.created_at)
            : null}
          <div class="mt-1 flex flex-col text-xs font-medium lg:hidden">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-1 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Jane Doeson
            </div>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-1 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Desktop Computer
            </div>
            <div class="">24 x 10 x 5 cm</div>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-1 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              1 Kg
            </div>
          </div>
        </td>

        <td class="whitespace-no-wrap py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
          {" " + order.order_type}
        </td>

        <td class="whitespace-no-wrap sm:hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
          {products.length !== 0
            ? products.map((product, index) => (
                <div key={index}>
                  {product.name + " "}*{" " + product.qty}
                </div>
              ))
            : null}
        </td>

        <td class="whitespace-no-wrap sm:hidden py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
          <span>$</span>
          {order.total_price}
        </td>

        <td class="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
          {order.order_status === "Delivered" ? (
            <span class="ml-4 mr-16 whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-green-800">
              {order.order_status}
            </span>
          ) : (
            <span class="ml-2 mr-4 whitespace-nowrap rounded-full bg-orange-100 px-2 py-0.5 text-orange-800">
              {order.order_status}
            </span>
          )}
        </td>
        <td>
          <button
            class="bg-white hover:bg-gray-100 text-gray-800 text-xs font-semibold py-1 px-4 border border-gray-200 rounded "
            onClick={() => invoiceClicked()}
          >
            Invoice
          </button>
        </td>
        <td>
          {order.order_status === "Delivered" && (
            <button
              class="bg-white hover:bg-gray-100 text-gray-800 text-xl py-1 px-4 ml-2 rounded"
              onClick={() => reportClicked()}
            >
              <MdOutlineReport className="" />
            </button>
          )}
        </td>
      </tr>
      <tr className="w-full border-b rounded text-sm h-10 text-gray-600">
        <td className="flex-1 ">Date : {order.dispatch_datetime}</td>
        <td></td>
        <td className=""></td>
        <td></td>
        <td>Address : {order.dispatch_address}</td>
      </tr>
    </React.Fragment>
  );
};

export default OrderRow;
