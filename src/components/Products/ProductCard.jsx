import React from "react";
import { BsCartPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../redux/action";
const ProductCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navBarstate = useSelector((state) => state.navbar);
  const handleItemClick = (item) => {
    if (!navBarstate[item]) {
      dispatch(setClicked(item, true));
      navigate("/p");
    }
  };
  return (
    <React.Fragment>
      <div class="w-52 bg-white shadow-md rounded-xl duration-500 hover:shadow-l">
        <a href="#" onClick={() => handleItemClick("productViewClicked")}>
          <img
            src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Product"
            class="h-52 w-52 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-t-xl"
          />
          <div class="px-4 py-3 w-72">
            <span class="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <p class="text-lg font-bold text-black truncate block capitalize">
              Product Name
            </p>
            <div class="flex items-center">
              <p class="line-through text-lg font-semibold text-black cursor-auto my-3">
                $149
              </p>
              <del>
                <p class="line-through text-sm text-gray-600 cursor-auto ml-2">
                  $199
                </p>
              </del>
            </div>
          </div>
          <div class="">
            <button
              type="button"
              class="bg-blue-500 w-40 h-10 py-3 text-xs text-white rounded mb-5 ml-5 hover:bg-blue-700"
            >
              Add to cart
            </button>
          </div>
        </a>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
