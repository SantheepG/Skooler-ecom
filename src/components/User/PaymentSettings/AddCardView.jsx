import React, { useEffect, useState } from "react";
import { AddCard } from "../../../api/UserAPI";
import { Toaster, toast } from "react-hot-toast";

const AddCardView = ({ cards, user, reload, close }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    card_no: "",
    expiry: "",
  });

  const handleInputChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, "");
    if (inputValue.length > 4) {
      inputValue = inputValue.slice(0, 5);
    }
    if (inputValue.length >= 2 && inputValue.length <= 4) {
      inputValue = inputValue.slice(0, 2) + "/" + inputValue.slice(2);
    }

    setExpiryDate(inputValue);
  };

  const addCard = async () => {
    try {
      if (nameOnCard !== "" && cardNumber !== "" && expiryDate !== "") {
        let existing_cards = cards.filter(
          (item) => item.card_no === cardNumber
        );
        if (existing_cards.length !== 0) {
          toast.error("Card alredy exists", {
            duration: 1000,
            position: "top-center",
            //icon: "❌",
          });
        } else {
          existing_cards = cards;
          existing_cards.push({
            card_no: cardNumber,
            name: nameOnCard,
            expiry: expiryDate,
          });
          const response = await AddCard({
            user_id: user.id,
            card_details: JSON.stringify(existing_cards),
          });
          if (response.status === 201) {
            toast.success("Card added", {
              duration: 1000,
              position: "top-center",
              //icon: "❌",
            });
            setTimeout(() => {
              reload();
              close();
            }, 1000);
          } else {
            toast.error("Omething went wrong", {
              duration: 1000,
              position: "top-center",
              //icon: "❌",
            });
          }
        }
      } else {
        console.log(cardDetails);
        console.log(cardNumber);
        console.log(nameOnCard);
        console.log(expiryDate);
        toast.error("Required fields are empty", {
          duration: 1000,
          position: "top-center",
          //icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div class="grid SlideDown gap-y-6 gap-x-3 sm:grid-cols-2 lg:px-8">
        <label class="block sm:col-span-2" for="name">
          <Toaster className="notifier" />

          <div class="relative">
            <input
              type="text"
              id="number"
              class="block px-2.5 pb-2.5 pt-4 w-full bg-white text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <label
              for="number"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Card number
            </label>
            <p
              id="filled_error_help"
              class="mt-1 hidden absolute text-xs text-red-600 dark:text-red-400"
            >
              <span class="font-medium">Card number field is empty</span>
            </p>
          </div>
        </label>
        <label class="block" for="name">
          <div class="relative">
            <input
              type="text"
              id="expiary"
              class="block px-2.5 pb-2.5 pt-4 bg-white w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={expiryDate}
              onChange={handleInputChange}
            />
            <label
              for="expiary"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Expire on
            </label>
          </div>
        </label>
        <label class="block" for="name">
          <div class="relative">
            <input
              type="text"
              id="name"
              class="block px-2.5 pb-2.5 bg-white pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
            />
            <label
              for="name"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Name on card
            </label>
          </div>
        </label>
        <button
          type="button"
          className="text-gray-900 bg-white border-2 border-red-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={close}
        >
          Cancel
        </button>
        <button
          type="button"
          className="text-gray-900 bg-white border-2 border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={addCard}
        >
          Add
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddCardView;
