import React from "react";
import "./Vouchers.css";
const Vouchers = () => {
  return (
    <React.Fragment>
      <div className="vouchers-component">
        <div className="list-header">
          <div className="list-header-container">
            <div className="vouchers-list-header-main">
              <div className="voucher-status">Status</div>
              <div className="voucher-code">Voucher code</div>
              <div className="voucher-valid-from">Valid from</div>
              <div className="voucher-valid-until">Valid until</div>
              <div className="voucher-value">Value</div>
            </div>
          </div>
        </div>
        <div className="voucher-items">
          <div className="voucher-item">
            <div className="voucher-status">Active</div>
            <div className="voucher-code">34234343</div>
            <div className="voucher-valid-from">29th, Nov 2023</div>
            <div className="voucher-valid-until">30th, Dec 2023</div>
            <div className="voucher-value">10%</div>
          </div>
          <div className="voucher-item">
            <div className="voucher-status">Inactive</div>
            <div className="voucher-code">342343453</div>
            <div className="voucher-valid-from">29th, Nov 2023</div>
            <div className="voucher-valid-until">30th, Nov 2023</div>
            <div className="voucher-value">15%</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Vouchers;
