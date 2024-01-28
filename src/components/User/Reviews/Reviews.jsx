import React, { useState, useEffect } from "react";
import "./Reviews.css";
import { fetchReviews } from "../../../api/UserAPI";
import Reviewed from "./Reviewed";
import ToReview from "./ToReview";

const Reviews = ({ user }) => {
  const [toReviewClicked, settoReviewClicked] = useState(true);
  const [reviewedClicked, setReviewedClicked] = useState(false);
  const [reload, setReload] = useState(false);
  const [toReview, setToReview] = useState([]);
  const [reviewed, setReviewed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchReviews(user.id);
        console.group(response);
        if (response) {
          setReviewed(response.data.reviewed);
          setToReview(response.data.toReview);
          setReload(false);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [reload]);

  const headerClickHandler = () => {
    if (toReviewClicked) {
      setReviewedClicked(true);
      settoReviewClicked(false);
    } else {
      setReviewedClicked(false);
      settoReviewClicked(true);
    }
  };

  return (
    <React.Fragment>
      <div className="reviews-component ViewContent">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li class="me-2">
              <a
                href="#"
                className={`inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-500 text-blue-600 border-b-2 border-blue-600 hover:text-blue-600`}
                onClick={() => headerClickHandler()}
              >
                Reviews
              </a>
            </li>
          </ul>
        </div>

        <div class="lg:border-gray-300">
          <Reviewed reviewed={reviewed} reload={() => setReload(true)} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Reviews;
