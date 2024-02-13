import React, { useState, useEffect } from "react";
import "./PaymentSettings.css";
import AddCardView from "./AddCardView";
import Card from "./Card";
import { AddCard } from "../../../api/UserAPI";
import { Toaster, toast } from "react-hot-toast";

import { FetchCards } from "../../../api/UserAPI";
const PaymentSettings = ({ user }) => {
  const [cards, setCards] = useState([]);
  const [cardDetails, setCardDetails] = useState([]);
  const [editClicked, setEditClicked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [view, setView] = useState(false);
  const [reloadCom, setReloadComp] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await FetchCards(user.id);
        if (response) {
          console.log(response);

          setCards(JSON.parse(response.data.cardData));
          setReloadComp(false);

          console.log(cards);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCards();
  }, [reloadCom]);

  const deleteCard = async (card) => {
    try {
      let existing_cards = cards.filter(
        (item) => item.card_no !== card.card_no
      );
      const response = await AddCard({
        user_id: user.id,
        card_details: JSON.stringify(existing_cards),
      });
      if (response) {
        toast.success("Card deleted", {
          duration: 1000,
          position: "top-center",
          //icon: "❌",
        });
        setTimeout(() => {
          setReloadComp(true);
        }, 1000);
      } else {
        toast.error("Something went wrong", {
          duration: 1000,
          position: "top-center",
          //icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        duration: 1000,
        position: "top-center",
        //icon: "❌",
      });
    }
  };

  return (
    <React.Fragment>
      <div class="col-span-8 rounded-xl sm:bg-gray-50 px-6 ViewContent">
        <div class="pt-4">
          <Toaster className="notifier" />

          <h1 class="py-2 text-2xl font-semibold">Payment settings</h1>
        </div>
        <hr class="mt-4 mb-8" />

        <div class="mb-10 grid gap-y-8 lg:grid-cols-2 lg:gap-y-0">
          <div class="space-y-8">
            {cards.length !== 0 ? (
              cards.map((card, index) => (
                <Card
                  key={index}
                  cardData={card}
                  deleteClicked={() => {
                    deleteCard(card);
                  }}
                />
              ))
            ) : (
              <div class="">
                <div class="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                  <img
                    class="h-10 object-contain pl-4"
                    src="/images/kt10d0A1TgzZpAoNM_YPX.png"
                    alt=""
                  />
                  <p class="ml-4 w-56">
                    <strong class="block text-md font-medium">
                      Nothing added
                    </strong>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mx-4">
            <div className="w-full mb-4 px-8 flex justify-between items-center">
              <div></div>
              <div className="text-right">
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={() => setView(!view)}
                >
                  {editClicked ? "Update" : "Add"}
                </button>
              </div>
            </div>

            {view && (
              <AddCardView
                user={user}
                cards={cards}
                reload={() => setReloadComp(true)}
                close={() => {
                  setView(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaymentSettings;
