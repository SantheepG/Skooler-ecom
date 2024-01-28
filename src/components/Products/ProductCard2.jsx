import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../redux/action";

const ProductCard2 = ({ productData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addText, setAddText] = useState("Add to cart");
  const [avgRating, setavgRating] = useState(0);
  const navBarstate = useSelector((state) => state.navbar);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    student_id: "",
    mobile_no: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      setUserData(storedUserData);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleItemClick = (item) => {
    if (!navBarstate[item]) {
      dispatch(setClicked(item, true));
      navigate(`/product/${productData.id}`);
    } else {
      dispatch(setClicked(item, false));
      dispatch(setClicked(item, true));
      navigate(`/product/${productData.id}`);
    }
  };

  const addToCart = async () => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      try {
        const response = axios.post(
          "http://127.0.0.1:8000/api/cart/add",
          {
            user_id: userData.id,
            product_id: productData.id,
            product_name: productData.name,
            quantity: 1,
            price: productData.discounted_price
              ? productData.discounted_price
              : productData.price,
            totalPrice: productData.discounted_price
              ? productData.discounted_price
              : productData.price,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response) {
          setAddText("Added");
          console.log(response);
          setTimeout(() => {
            setAddText("Add to cart");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <React.Fragment>
      <div class="relative flex max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a
          class="relative mx-5 mt-3 flex h-60 overflow-hidden rounded-xl"
          href="#"
          onClick={() => handleItemClick("productViewClicked")}
        >
          <img
            class="object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
            src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="product image"
          />
          {productData.discount !== null ? (
            <span class="absolute top-0 left-0 m-2 rounded-full bg-black bg-opacity-50 px-2 text-center text-xs font-medium text-white">
              {Math.floor(productData.discount) + "% OFF"}
            </span>
          ) : (
            ""
          )}
        </a>
        <div class="mt-4 px-5 pb-5">
          <a href="#">
            <h5 class="text-l tracking-tight text-slate-900">
              {productData.name}{" "}
              {productData.size !== null ? (
                <span className="text-sm text-gray-600">
                  {" "}
                  - {productData.size}
                </span>
              ) : null}
              {productData.color !== null ? (
                <span className="text-sm text-gray-600">
                  {" "}
                  | {productData.color}
                </span>
              ) : null}
            </h5>
          </a>
          <div class="mt-2 mb-5 flex items-center justify-between">
            <div className="flex">
              {productData.discount !== null ? (
                <React.Fragment>
                  <p className="line-through ">
                    <span class="text-l font-bold text-gray-400">
                      <span className="currency-symbol"></span>
                      {productData.price}
                    </span>
                  </p>
                  <p className="ml-2">
                    <span class="text-l font-bold text-slate-900">
                      <span className="currency-symbol"></span>
                      {(
                        productData.price -
                        (productData.price * Math.floor(productData.discount)) /
                          100
                      ).toFixed(2)}
                    </span>
                  </p>
                </React.Fragment>
              ) : (
                <p className="ml-2">
                  <span class="text-l font-bold text-slate-900">
                    <span className="currency-symbol"></span>
                    {productData.price}
                  </span>
                </p>
              )}
            </div>

            <div class="flex items-center">
              <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                <span className="slideInFromTopAnim">
                  {productData.avg_rating}
                </span>
                <span>/5.0</span>
              </span>
            </div>
          </div>
          {productData.stock !== 0 ? (
            <button
              href="#"
              class="flex w-full items-center justify-center rounded-md bg-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={addToCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="slideInFromTopAnim">{addText}</span>
            </button>
          ) : (
            <button
              href="#"
              disabled
              class="disabled:bg-gray-500 flex w-full items-center justify-center rounded-md bg-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2  w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="slideInFromTopAnim">Out of stock</span>
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductCard2;
