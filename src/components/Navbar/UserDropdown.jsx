import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setClicked } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const UserDropdown = ({ userData }) => {
  const dispatch = useDispatch();
  const navBarstate = useSelector((state) => state.navbar);
  const navigate = useNavigate();
  useEffect(() => {
    if (navBarstate.userClicked) {
      navigate("/user");
    }
  }, [navBarstate, navigate]);

  const handleItemClick = (item) => {
    if (!navBarstate[item]) {
      dispatch(setClicked(item, true));
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("logged out");
        localStorage.clear();
        window.location.reload();
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <React.Fragment>
      <div
        class="SlideDown z-50 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        id="dropdown"
      >
        <div class="py-3 px-4">
          <span class="block text-sm font-semibold text-gray-900 dark:text-white">
            {userData.name}
          </span>
          <span class="block text-sm text-gray-500 truncate dark:text-gray-400">
            {userData.email}
          </span>
        </div>
        <ul
          class="py-1 text-gray-500 dark:text-gray-400"
          aria-labelledby="dropdown"
        >
          <li>
            <a
              href="#"
              class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
              onClick={() => handleItemClick("userClicked")}
            >
              My profile
            </a>
          </li>
        </ul>

        <ul
          class="py-1 text-gray-500 dark:text-gray-400"
          aria-labelledby="dropdown"
        >
          <li>
            <a
              href="#"
              class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleLogout}
            >
              Log out
            </a>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default UserDropdown;
