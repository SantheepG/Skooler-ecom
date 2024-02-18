import React, { useEffect, useState } from "react";
import "./Complaints.css";
import { FetchComplaints } from "../../../api/UserAPI";

import ComplaintRow from "./ComplaintRow";
const Complaints = ({ user }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchUserComplaints = async () => {
      if (user !== null) {
        let response = await FetchComplaints(user.id);
        if (response) {
          setComplaints(response.data.complaints);
        } else {
          console.log("error");
        }
      }
    };

    fetchUserComplaints();
  }, []);

  return (
    <React.Fragment>
      {user !== null && (
        <div class="overflow-hidden ViewContent rounded-xl bg-gray-50 shadow">
          <table class="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
            <thead class="border-b md:hidden sm:hidden lg:table-header-group">
              <tr class="">
                <td class="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                  Lodged on
                </td>

                <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                  Complaint ID
                </td>
                <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                  Product
                </td>

                <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                  complaint
                </td>

                <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                  Status
                </td>
              </tr>
            </thead>

            <tbody class="lg:border-gray-300">
              {complaints.length !== 0 ? (
                complaints.map((complaint, index) => (
                  <ComplaintRow key={index} complaint={complaint} />
                ))
              ) : (
                <tr class="bg-white w-full border rounded">
                  Nothing available
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

export default Complaints;
