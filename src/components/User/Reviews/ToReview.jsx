import React, { useState } from "react";

const ToReview = ({ toReview }) => {
  const [currentReviewID, setCurrentReviewID] = useState(0);
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
      {toReview !== null && toReview.length !== 0 ? (
        <ul>
          {toReview.map((review, index) => (
            <li
              key={index}
              class="py-8 bg-white rounded-md border-b text-left px-4 m-2 shadow-md"
            >
              <div class="flex items-start">
                <img
                  class="block h-10 w-10 max-w-full flex-shrink-0 rounded-full align-middle"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />

                <div class="ml-6 w-full">
                  <div class="flex w-full justify-between items-center">
                    <div className="flex">
                      <span className="p-2">{review.product_name}</span>
                      <span className="p-2 flex text-sm">
                        <span>
                          <svg
                            class="block h-5 w-5 ml-2 mr-1 align-middle text-yellow-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              class=""
                            ></path>
                          </svg>
                        </span>
                        {review.rating}/5{" "}
                      </span>
                    </div>
                    <div className="hover:text-red-600 cursor-pointer">
                      sfsf
                    </div>
                  </div>
                  <p class="mt-5 text-base text-gray-900">{review.comment}</p>
                  <p class="mt-1 text-sm text-gray-600">
                    {getFormattedDate(review.created_at)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <tr className="w-full border-b rounded text-sm text-gray-600">
          Nothing available
        </tr>
      )}
    </React.Fragment>
  );
};
export default ToReview;
