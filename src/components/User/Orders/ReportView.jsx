import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa6";
import { lodgeAComplaint } from "../../../api/UserAPI";
import html2pdf from "html2pdf.js";
import { Toaster, toast } from "react-hot-toast";
const ReportView = ({ user, order, closeModal }) => {
  const [products, setProducts] = useState([]);
  const [complaintProductID, setComplaintProductID] = useState(0);
  const [complaintDesc, setComplaintDesc] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [complaintImgs, setComplaintImgs] = useState(null);

  useEffect(() => {
    const ParseProducts = () => {
      if (order !== null) {
        let products = JSON.parse(order.products);
        setProducts(products);
      }
    };
    ParseProducts();
  }, [order]);

  const LodgeAComplaint = async () => {
    try {
      let complaintProduct = products.find(
        (product) => product.product_id === complaintProductID
      );
      console.log(complaintProduct);
      console.log(complaintProductID);
      console.log(
        order.id,
        user.id,
        complaintProductID,

        complaintType,
        complaintDesc
      );
      if (
        complaintProductID !== 0 &&
        complaintDesc !== "" &&
        complaintType !== ""
      ) {
        let data = {
          order_id: order.id,
          user_id: user.id,
          product_id: complaintProductID,
          product_name: complaintProduct.name,
          qty: complaintProduct.qty,
          type: complaintType,
          description: complaintDesc,
          status: "pending",
          images: complaintImgs,
        };
        const response = await lodgeAComplaint(data);
        console.group(response);
        if (response) {
          toast.success("Complaint lodged", {
            duration: 1000,
            position: "top-center",
            //icon: "❌",
          });
          setTimeout(() => {
            closeModal();
          }, 1500);
        }
      } else {
        toast.error("Required fields are empty", {
          duration: 1300,
          position: "top-center",
          //icon: "❌",
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getFormattedDate = (timestamp) => {
    if (timestamp !== null) {
      const datePart = timestamp.split("T")[0];
      //const timePart = timestamp.split("T")[1].split(".")[0];

      const datetime = `${datePart}`;

      return datetime;
    }
    return null;
  };

  return (
    <React.Fragment>
      <div className="modal ViewContent">
        <div className="h-100 mt-4 overflow-auto">
          <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
            <div class="flex items-center justify-between mb-8">
              <Toaster className="notifier" />
              <div class="flex items-center">
                <div class="text-gray-700 font-semibold text-lg">Skooler</div>
              </div>
              <div class="flex items-center justify-betweentext-gray-700">
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
                    Please select the product from below
                  </div>
                </div>
              </div>

              <table class="w-full text-left mb-8">
                <thead>
                  <tr>
                    <th class="text-gray-700 font-bold uppercase py-2"></th>
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
                          <td class="py-4 text-gray-700">
                            <input
                              id="default-radio-1"
                              key={index}
                              type="radio"
                              value={product.product_id}
                              name="default-radio"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              onChange={(e) =>
                                setComplaintProductID(parseInt(e.target.value))
                              }
                            />
                          </td>
                          <td class="py-4 text-gray-700">{product.name}</td>
                          <td class="py-4 text-gray-700">${product.price}</td>

                          <td class="py-4 text-gray-700">{product.qty}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
              <div>
                <div>
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Please select an option below
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setComplaintType(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select
                    </option>
                    <option value="Defective">Defective or damaged</option>
                    <option value="Wrong product">
                      Wrong product received
                    </option>
                    <option value="Missing items">Missing items</option>
                  </select>
                </div>
                <div>
                  <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  ></label>
                  <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your complaint here"
                    onChange={(e) => setComplaintDesc(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div class="flex justify-end mb-8"></div>
              <div class="border-t-2 pl-36 border-gray-300 pt-4 text-gray-500">
                <button
                  type="button"
                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  onClick={() => LodgeAComplaint()}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={() => closeModal()}
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ReportView;
