import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../../redux/action";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sideBarstate = useSelector((state) => state.sidebar);

  const handleItemClick = (item) => {
    if (!sideBarstate[item]) {
      dispatch(setClicked(item, true));
    }
  };
  return (
    <React.Fragment>
      <div class="relative my-4 w-56 sm:hidden">
        <input
          class="peer hidden"
          type="checkbox"
          name="select-1"
          id="select-1"
        />
        <label
          for="select-1"
          class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring"
        >
          Accounts{" "}
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
            Accounts
          </li>
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
            Team
          </li>
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
            Others
          </li>
        </ul>
      </div>

      <div className="col-span-2 sm:block md:block lg:block">
        <ul className="block">
          <li
            className={`${
              sideBarstate.profileClicked ? "border-l-blue-700" : ""
            } mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700`}
            onClick={() => handleItemClick("profileClicked")}
          >
            Profile
          </li>
          <li
            className={`${
              sideBarstate.ordersClicked ? "border-l-blue-700" : ""
            } mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700`}
            onClick={() => handleItemClick("ordersClicked")}
          >
            Orders
          </li>
          <li
            className={`${
              sideBarstate.paymentsClicked ? "border-l-blue-700" : ""
            } mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700`}
            onClick={() => handleItemClick("paymentsClicked")}
          >
            Payment settings
          </li>
          <li
            className={`${
              sideBarstate.complaintsClicked ? "border-l-blue-700" : ""
            } mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700`}
            onClick={() => handleItemClick("complaintsClicked")}
          >
            Complaints
          </li>
          <li
            className={`${
              sideBarstate.reviewsClicked ? "border-l-blue-700" : ""
            } mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700`}
            onClick={() => handleItemClick("reviewsClicked")}
          >
            Reviews
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
