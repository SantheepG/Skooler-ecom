import React, { useState, useEffect } from "react";
import "./Cart.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import { BsDashSquare, BsTrash3, BsPlusSquare } from "react-icons/bs";
import CartRow from "./CartRow";
import axios from "axios";

const Cart = () => {
  const [userData, setUserData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [id, setid] = useState(userData.id);
  const [subtotal, setSubtotal] = useState(0);
  const [totalCost, settotalCost] = useState(0);
  const [voucher, setVoucher] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await axios.get(
          `http://127.0.0.1:8000/api/cart/${user.id}`
        );
        if (response && response.data) {
          setCartItems(response.data.cart);
          //setSubtotal(response.data.subtotal);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();

    //calculateSubTotal();
  }, []);

  useEffect(() => {
    const fetchSubtotal = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(
        `http://127.0.0.1:8000/api/cart/fetchtotal/${user.id}`
      );
      if (response) {
        setSubtotal(response.data.subtotal);
        setDataChanged(false);
      }
    };
    fetchSubtotal();
  }, [dataChanged]);

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/cart/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setDataChanged(true);
        console.log("Item deleted successfully");
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.id !== id)
        );
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const calculateSubTotal = () => {
    const subt = cartItems.reduce(
      (accumulator, item) => accumulator + parseFloat(item.totalPrice),
      0
    );
    setSubtotal(subt.toFixed(2));
  };

  const changeQty = (index, qty) => {
    console.log("passed qty: ", qty);
    console.log("in cart before change", cartItems[index].quantity);
    cartItems[index].quantity = qty;
    cartItems[index].totalPrice = (cartItems[index].price * qty).toFixed(2);
    setDataChanged(true);
    console.log("in cart ", cartItems[index].quantity);
  };

  return (
    <React.Fragment>
      {" "}
      <div className="main-screen-container">
        <div className="navbar-header-container">
          <Navbar />
        </div>
        <div className="skooler-main-container">
          <div className="content">
            {" "}
            <div className="cart-content">
              <div className="left-column">
                <div className="cart-container">
                  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-16 py-3">
                            <span class="sr-only">Image</span>
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Product
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Price
                          </th>
                          <th scope="col" class="px-16 py-3">
                            Qty
                          </th>

                          <th scope="col" class="px-6 py-3">
                            Total
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.length !== 0 ? (
                          cartItems.map((item, index) => (
                            <CartRow
                              key={index}
                              product={item}
                              qtyUpdate={(qty) => changeQty(index, qty)}
                              deleteItem={() => deleteItem(item.id)}
                            />
                          ))
                        ) : (
                          <tr className="bg-white w-full items-center justify-center border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <p className="pt-10 pb-10 ml-10">Cart is empty</p>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="right-column">
                <div className="summary-section">
                  <div className="summary-section-heading">Order summary</div>
                  <div className="summary-section-content">
                    <div class="summary">
                      <div class="summary-total-items">
                        <span class="total-items"></span> Total cost of your
                        Cart
                      </div>
                      <div class="summary-subtotal">
                        <div class="subtotal-title">Subtotal</div>
                        <div
                          class="subtotal-value final-value"
                          id="basket-subtotal"
                        >
                          <span className="currency-symbol"></span>
                          {subtotal}
                        </div>
                        <div class="summary-promo hide">
                          <div class="promo-title">Promotion</div>
                          <div
                            class="promo-value final-value"
                            id="basket-promo"
                          ></div>
                        </div>
                      </div>
                      <div class="summary-delivery">
                        <select
                          name="delivery-collection"
                          class="summary-delivery-selection"
                        >
                          <option value="0" selected="selected">
                            Select Pickup or Delivery
                          </option>
                          <option value="pickup">Pickup</option>
                          <option value="delivery">Delivery</option>
                        </select>
                      </div>
                      <div className="cart-voucher-code">
                        <span className="cart-voucher-code-input">
                          <input type="text" placeholder="Enter Voucher Code" />
                        </span>
                        <span>
                          <button className="cart-voucher-code-add-btn">
                            ADD
                          </button>
                        </span>
                      </div>
                      <div class="summary-total">
                        <div class="total-title">Total</div>
                        <div class="total-value final-value" id="basket-total">
                          <span className="currency-symbol"></span>
                          {totalCost}
                        </div>
                      </div>
                      <div class="summary-checkout">
                        <button class="checkout-cta">
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;
