import React from "react";
import { MdDeleteForever } from "react-icons/md";
const ComplaintRow = ({ complaint }) => {
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
      {complaint !== null && (
        <tr class="bg-white w-full border rounded">
          <td class="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
            {getFormattedDate(complaint.created_at)}
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
            {complaint.id}
          </td>

          <td class="whitespace-no-wrap py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
            <div>{complaint.product_name}</div>
            <div className="text-sm text-gray-500">qty : {complaint.qty}</div>
          </td>

          <td class="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
            <div>{complaint.type} - </div>
            <div className="text-sm text-gray-500">{complaint.description}</div>
            <span class="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-center text-xs text-purple-800 lg:hidden">
              {complaint.status}
            </span>
          </td>

          <td class="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
            {complaint.status === "resolved" ? (
              <span class="whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-green-800">
                {complaint.status}
              </span>
            ) : (
              <span class="whitespace-nowrap rounded-full bg-orange-100 px-2 py-0.5 text-orange-800">
                {complaint.status}
              </span>
            )}
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default ComplaintRow;
