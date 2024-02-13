import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const Card = ({ cardData, deleteClicked }) => {
  const [viewDelete, setViewDelete] = useState(null);

  return (
    <React.Fragment>
      <div class="">
        <div class="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
          <img
            class="h-10 object-contain pl-4"
            src="/images/kt10d0A1TgzZpAoNM_YPX.png"
            alt=""
          />
          <p class="ml-4 w-56">
            <strong class="block text-md font-medium">
              {cardData.card_no.substring(0, 5)}***********
            </strong>
            <strong class="block text-md font-medium">{cardData.name}</strong>
          </p>
          <button class="ml-auto mr-4 inline-flex text-xl hover:text-red-500 font-semibold text-blue-600 underline decoration-2">
            <MdDelete onClick={deleteClicked} />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Card;
