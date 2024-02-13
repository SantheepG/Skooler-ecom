import React, { useState, useEffect } from "react";
import "./Cart.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import { BsDashSquare, BsTrash3, BsPlusSquare } from "react-icons/bs";
import CartRow from "./CartRow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../Navbar/Navbar2";
const Cart = ({ ui, school }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [itemData, setItemData] = useState([]);
  //const [id, setid] = useState(userData.id);
  const [subtotal, setSubtotal] = useState(0);
  const [totalCost, settotalCost] = useState(0);
  const [voucher, setVoucher] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);
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
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedUserData = JSON.parse(localStorage.getItem("user"));
        if (!storedUserData) {
          navigate("/");
        } else {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/cart/${storedUserData.id}`
          );
          if (response && response.data) {
            setCartItems(response.data.cart);
            setSubtotal(response.data.subtotal);
          } else {
            console.log(response);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();

    //calculateSubTotal();
  }, []);

  const updateSubtotal = (newSubtotal) => {
    setSubtotal(newSubtotal);
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/cart/delete/${id}`
      );

      if (response) {
        console.log(response);
        setSubtotal(response.data.subtotal);
        setDataChanged(true);
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
          <Navbar2 ui={ui} school={school} />
        </div>
        <div className="mt-12">
          <div class="h-screen pt-20">
            <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div class="rounded-lg md:w-2/3">
                {cartItems.length !== 0 ? (
                  cartItems.map((item, index) => (
                    <CartRow
                      key={index}
                      product={item}
                      subtotal={updateSubtotal}
                      qtyUpdate={(qty) => changeQty(index, qty)}
                      deleteItem={() => deleteItem(item.id)}
                    />
                  ))
                ) : (
                  <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <p className="pt-10 pb-10 ml-10">Cart is empty</p>
                  </div>
                )}
              </div>

              <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div class="mb-2 flex justify-between">
                  <p class="text-gray-700">Subtotal</p>
                  <p class="text-gray-700">
                    <span className="currency-symbol"></span>
                    {subtotal !== null ? subtotal : "0"}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="text-gray-700"></p>
                  <p class="text-gray-700"></p>
                </div>
                <hr class="my-4" />
                <div class="flex justify-between">
                  <p class="text-lg font-bold">Total</p>
                  <div class="">
                    <p class="mb-1 text-lg font-bold">
                      <span className="currency-symbol"></span>
                      {subtotal !== null ? subtotal : "0"}
                    </p>
                    <p class="text-sm text-gray-700"></p>
                  </div>
                </div>
                <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;
