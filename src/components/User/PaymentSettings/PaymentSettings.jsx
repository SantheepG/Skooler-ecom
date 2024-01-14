import React, { useState, useEffect } from "react";
import "./PaymentSettings.css";
const PaymentSettings = () => {
  const [cardDetails, setCardDetails] = useState([]);
  return (
    <React.Fragment>
      <div className="payment-settings-component">
        <div className="header-container">
          <div className="user-section-btn add-card-details">
            <a href="" className="add-card-btn">
              Add card details
            </a>
          </div>
        </div>
        <div className="card-details">
          {cardDetails.length ? (
            <div>fdfd</div>
          ) : (
            <div>No card details available</div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaymentSettings;
