import React, { useState } from "react";
import axios from "axios";
import { useStore } from "react-redux";

const CartRow = ({ product, qtyUpdate, deleteItem }) => {
  const [qty, setQty] = useState(product.quantity);
  const [tprice, setTPrice] = useState(product.price);

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

  return (
    <React.Fragment>
      <tr
        class={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
      >
        <td class="p-4">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
            class="w-16 md:w-32 max-w-full max-h-full"
            alt="Apple Watch"
          />
        </td>
        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product_name}
        </td>
        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price}
        </td>
        <td class="px-6 py-4">
          <div class="flex items-center">
            <button
              class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={handleDecrease}
            >
              <span class="sr-only">Quantity button</span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <div>
              <input
                type="text"
                id="first_product"
                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={qty}
                min={1}
                required
              />
            </div>
            <button
              class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={handleIncrease}
            >
              <span class="sr-only">Quantity button</span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </td>

        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white SlideDown">
          {product.totalPrice}
        </td>
        <td class="px-6 py-4">
          <button
            href="#"
            class="font-medium text-red-600 dark:text-red-500 hover:underline"
            onClick={() => {
              deleteItem();
            }}
          >
            Remove
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
};
export default CartRow;
