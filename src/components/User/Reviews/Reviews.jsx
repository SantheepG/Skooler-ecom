import React, { useState, useEffect } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [toReviewClicked, settoReviewClicked] = useState(true);
  const [reviewedClicked, setReviewedClicked] = useState(false);

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
      <div className="reviews-component">
        {" "}
        <div className="list-header">
          <div className="list-header-container">
            <div className="list-header-main">
              <span>
                <a
                  href="#"
                  className={`to-review ${
                    toReviewClicked ? "review-active" : ""
                  }`}
                  onClick={headerClickHandler}
                >
                  To review
                </a>
              </span>

              <span>
                <a
                  href="#"
                  className={`to-review ${
                    reviewedClicked ? "review-active" : ""
                  }`}
                  onClick={headerClickHandler}
                >
                  Reviewed
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Reviews;
