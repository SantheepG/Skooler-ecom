import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../redux/action";
const CartRow = ({ product, qtyUpdate, deleteItem, subtotal }) => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navBarstate = useSelector((state) => state.navbar);

  useEffect(() => {
    if (product !== null) {
      setQty(product.quantity);
    }
  }, []);

  const handleDecrease = async () => {
    try {
      if (qty > 1) {
        console.log(qty);
        let newQty = qty - 1;
        setQty(newQty);
        qtyUpdate(newQty);
        console.log(qty);
        const response = await axios.put(
          `http://127.0.0.1:8000/api/updatecart/${product.id}/${newQty}/${product.price}`
        );
        if (response) {
          console.log("qty changed");
          subtotal(parseFloat(response.data.subtotal));
          //qtyUpdate(qty);
        } else {
          console.log("something went wrong");
          let oldQty = qty + 1;
          setQty(oldQty);
          qtyUpdate(oldQty);
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleIncrease = async () => {
    try {
      console.log(qty);
      let newQty = qty + 1;
      setQty(newQty);
      qtyUpdate(newQty);
      console.log(qty);

      const response = await axios.put(
        `http://127.0.0.1:8000/api/updatecart/${product.id}/${newQty}/${product.price}`
      );
      if (response) {
        console.log("qty changed");
        subtotal(response.data.subtotal);
      } else {
        console.log("something went wrong");
        let oldQty = qty - 1;
        setQty(oldQty);
        qtyUpdate(oldQty);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const handleItemClick = (item) => {
    if (!navBarstate[item]) {
      dispatch(setClicked(item, true));
      navigate(`/product/${product.id}`);
    } else {
      dispatch(setClicked(item, false));
      dispatch(setClicked(item, true));
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <React.Fragment>
      <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img
          src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="product-image"
          class="w-full rounded-lg sm:w-40"
        />
        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div
            class="mt-5 sm:mt-0 cursor-pointer"
            onClick={() => handleItemClick("productViewClicked")}
          >
            <h2 class="text-lg font-bold text-gray-900">
              {product.product_name}
            </h2>
            <p class="mt-1 text-xs text-gray-700">
              {product.size !== null ? product.size : null}
              {product.color !== null ? product.color : null}
            </p>
            <p className="text-sm text-gray-500">
              <span className="currency-symbol"></span>
              {product.price}
            </p>
          </div>
          <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div class="flex items-center border-gray-100">
              <span
                class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                onClick={handleDecrease}
              >
                {" "}
                -{" "}
              </span>
              <input
                class="h-8 w-16 bg-white text-center text-xs outline-none"
                type="text"
                value={qty}
                min={1}
                required
              />
              <span
                class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                onClick={handleIncrease}
              >
                {" "}
                +{" "}
              </span>
            </div>
            <div class="flex items-center space-x-4">
              <p class="text-sm">
                <span className="currency-symbol"></span>
                {product.totalPrice}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                onClick={() => {
                  deleteItem();
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default CartRow;
