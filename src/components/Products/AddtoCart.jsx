import React from "react";
import "./AddtoCart.scss";
const AddtoCart = () => {
  return (
    <React.Fragment>
      <button class="add-to-cart">
        <div class="default">Add to cart</div>
        <div class="success">Added</div>
        <div class="cart">
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="dots"></div>
      </button>
    </React.Fragment>
  );
};

export default AddtoCart;
