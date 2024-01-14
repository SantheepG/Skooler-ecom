import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import ProductCard2 from "./ProductCard2";
import defaultpic from "../assets/default-avatar.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const ProductView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { avgr } = useParams();
  const [addText, setAddText] = useState("Add to cart");
  const [productData, setProductData] = useState([]);
  const [productReviews, setProductReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviewClicked, setReviewClicked] = useState(false);
  const [givenRating, setgivenRating] = useState(0);
  const [givenReview, setgivenReview] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    student_id: "",
    mobile_no: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/products/related/${id}`
        );
        if (response) {
          setRelatedProducts(response.data);
          console.log(relatedProducts);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRelatedProducts();
  }, []);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      setUserData(storedUserData);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/product/${id}`
        );

        setProductData(response.data.product);
        setProductReviews(response.data.reviews);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProductData();
  }, []);

  const addToCart = async () => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      try {
        const response = axios.post(
          "http://127.0.0.1:8000/api/cart/add",
          {
            user_id: userData.id,
            product_id: productData.products_id,
            product_name: productData.name,
            quantity: 1,
            price: productData.discounted_price
              ? productData.discounted_price
              : productData.price,
            totalPrice: productData.price,
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

  const rateProduct = async (r) => {
    if (userData.id === "") {
      toast.error("Kindly login to review this product");
      setgivenRating(0);
    } else {
      try {
        const response = axios.post("http://127.0.0.1:8000/api/product/rate", {
          product_id: productData.products_id,
          user_id: userData.id,
          rating: r,
        });

        if (response) {
          toast.success("Thank you for rating!");
        } else {
          toast.error("Error in rating. Please try again");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Reviewed date formatter
  const formatDate = (timestamp) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = new Date(timestamp).toLocaleDateString(
      "en-US",
      options
    );
    const formattedTime = new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return formattedDate;
  };
  return (
    <React.Fragment>
      <div className="main-screen-container">
        <div className="navbar-header-container">
          <Navbar />
        </div>

        <div className="skooler-main-container">
          <Toaster className="notifier" />
          <div class="mt-20 mx-5 grid grid-cols-5 gap-4">
            <div class="col-span-5 sm:col-span-4">
              {" "}
              <div class="bg-white dark:bg-gray-800 py-8 border-gray-800">
                <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div class="flex flex-col md:flex-row -mx-4">
                    <div class="md:flex-1 px-4">
                      <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                        <img
                          class="w-full h-full object-cover"
                          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                          alt="Product Image"
                        />
                      </div>
                      <div class="flex -mx-2 mb-4">
                        <div class="w-1/2 px-2">
                          <button
                            class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                            onClick={addToCart}
                          >
                            {addText}
                          </button>
                        </div>
                        <div class="w-1/2 px-2">
                          <button class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="md:flex-1 px-4">
                      <div className="flex">
                        <div>
                          {" "}
                          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            {productData.name}
                          </h2>
                        </div>

                        <div class="pb-5 bg-white px-4 sm:my-0 sm:ml-auto">
                          <div class="flex items-center">
                            <svg
                              class="w-4 h-4 text-yellow-300 me-1"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                              {avgr} / 5
                            </p>
                            <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                            <a
                              href="#"
                              class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                            >
                              {productReviews.length}{" "}
                              {productReviews.length === 1
                                ? "review"
                                : "reviews"}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div class="flex mb-8">
                        <div class="flex mr-4">
                          <div class="font-bold text-gray-700 dark:text-gray-300">
                            Price :{" "}
                          </div>
                          <div>
                            {productData.discount !== null ? (
                              <p className="ml-2">
                                <span class="text-l text-slate-900">
                                  <span className="currency-symbol"></span>
                                  {(
                                    productData.price -
                                    (productData.price *
                                      Math.floor(productData.discount)) /
                                      100
                                  ).toFixed(2)}
                                </span>
                              </p>
                            ) : (
                              <p className="ml-2">
                                <span class="text-l font-bold text-slate-900">
                                  <span className="currency-symbol"></span>
                                  {productData.price}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="">
                          <span class="font-bold text-gray-700 dark:text-gray-300 ">
                            Availability :{" "}
                          </span>
                          {productData.quantity !== 0 ? (
                            productData.quantity < 4 ? (
                              <span className="text-red-600 dark:text-gray-300">
                                Only {productData.stock} left
                              </span>
                            ) : (
                              <span className="text-gray-600 dark:text-gray-300">
                                In Stock
                              </span>
                            )
                          ) : (
                            <span className="text-red-700 dark:text-gray-300">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                      <div class="mb-6">
                        <span class="font-bold text-gray-700 dark:text-gray-300">
                          Select Color :
                        </span>
                        <div class="flex items-center mt-2">
                          <button class="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                          <button class="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                          <button class="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                          <button class="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                        </div>
                      </div>
                      <div class="mb-4">
                        <span class="font-bold text-gray-700 dark:text-gray-300">
                          Select Size:
                        </span>
                        <div class="flex items-center mt-2">
                          <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                            S
                          </button>
                          <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                            M
                          </button>
                          <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                            L
                          </button>
                          <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                            XL
                          </button>
                          <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                            XXL
                          </button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <span class="font-bold text-gray-700 dark:text-gray-300">
                          Product Description:
                        </span>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                          {productData.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex mt-10 ml-20  ">
                  <div>
                    <h4 className="text-2xl">Reviews</h4>
                  </div>
                  <div className="ml-8">
                    <button
                      class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                      onClick={() => setReviewClicked(!reviewClicked)}
                    >
                      Rate & review
                    </button>
                  </div>
                </div>
                <div
                  className={`SlideDown flex border rounded w-1/2 mt-5 ml-20 ${
                    reviewClicked ? "" : "hidden"
                  }`}
                >
                  <div className="border rounded m-2 w-2/3 ">
                    <textarea
                      id="review"
                      rows="4"
                      class=" w-full pt-10 rounded pl-5 h-36 px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                      placeholder="We'd like to hear from you"
                      onChange={(e) => setgivenReview(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="m-2 w-1/3 ">
                    <div class="flex w-full items-center pl-10 pt-3 pb-5">
                      <button
                        type="button"
                        class={`${
                          givenRating === 1 || givenRating > 1
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } w-5 h-5 inline-flex justify-center items-center text-2xl rounded-full hover:text-yellow-400 disabled:opacity-50 disabled:pointer-events-none dark:text-yellow-500`}
                        onClick={() => {
                          setgivenRating(1);
                          rateProduct(1);
                        }}
                      >
                        <svg
                          class="flex-shrink-0 w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        class={`${
                          givenRating === 2 || givenRating > 2
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } w-5 h-5 inline-flex justify-center items-center text-2xl rounded-full hover:text-yellow-400 disabled:opacity-50 disabled:pointer-events-none dark:text-yellow-500`}
                        onClick={() => {
                          setgivenRating(2);
                          rateProduct(2);
                        }}
                      >
                        <svg
                          class="flex-shrink-0 w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        class={`${
                          givenRating === 3 || givenRating > 3
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } w-5 h-5 inline-flex justify-center items-center text-2xl rounded-full hover:text-yellow-400 disabled:opacity-50 disabled:pointer-events-none dark:text-yellow-500`}
                        onClick={() => {
                          setgivenRating(3);
                          rateProduct(3);
                        }}
                      >
                        <svg
                          class="flex-shrink-0 w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        class={`${
                          givenRating === 4 || givenRating > 4
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } w-5 h-5 inline-flex justify-center items-center text-2xl rounded-full hover:text-yellow-400 disabled:opacity-50 disabled:pointer-events-none dark:text-yellow-500`}
                        onClick={() => {
                          setgivenRating(4);
                          rateProduct(4);
                        }}
                      >
                        <svg
                          class="flex-shrink-0 w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        class={`${
                          givenRating === 5 || givenRating > 5
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } w-5 h-5 inline-flex justify-center items-center text-2xl rounded-full hover:text-yellow-400 disabled:opacity-50 disabled:pointer-events-none dark:text-yellow-500`}
                        onClick={() => {
                          setgivenRating(5);
                          rateProduct(5);
                        }}
                      >
                        <svg
                          class="flex-shrink-0 w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      </button>
                    </div>

                    <button className="ml-8 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-8 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
                      Submit
                    </button>
                  </div>
                </div>
                <div className="mr-40 ml-20">
                  <hr class="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-5" />
                  {productReviews.length !== 0 ? (
                    productReviews.map((review) => (
                      <div class="mx-auto mb-2 flex rounded-xl border border-gray-100 p-4 text-left text-gray-600 border-gray-300 sm:p-8">
                        <img
                          class="mr-5 block h-8 w-8 max-w-full text-left align-middle sm:h-16 sm:w-16"
                          src={defaultpic}
                          alt="Profile Picture"
                        />
                        <div class="w-full text-left">
                          <div class="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row">
                            <h3 class="font-medium">Diana Anderson</h3>
                            <div class="bg-white px-4 sm:my-0 sm:ml-auto">
                              <div class="flex h-8 items-center text-l font-bold text-blue-900">
                                <svg
                                  class="w-4 h-4 text-yellow-300 me-1"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                                  {review.rating} / 5
                                </p>
                              </div>
                            </div>
                          </div>
                          <p class="text-sm">{review.comment}</p>
                          <div class="mt-5  w-full flex items-center justify-between text-gray-500">
                            <time class="text-xs " datetime="2022-11-13T20:00Z">
                              {formatDate(review.created_at)}
                            </time>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div class="mx-auto flex rounded-xl border border-gray-100 p-4 text-left text-gray-600 border-gray-300 sm:p-8">
                      <div class="w-full text-left">
                        <div class="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row">
                          <h3 class="font-medium">
                            Be the first to review this product
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class="col-span-5 sm:col-span-1">
              <div className="border pt-5 p-5">
                <div className="mb-5 text-gray-600">Related products</div>
                <hr class="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-5" />

                <div className="pb-10">
                  {relatedProducts.map((product) => (
                    <div className="mb-5">
                      <ProductCard2
                        key={product.products_id}
                        productData={product}
                      />
                    </div>
                  ))}
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
export default ProductView;
