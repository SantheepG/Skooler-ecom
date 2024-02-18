import React, { useState } from "react";
import Navbar2 from "../Navbar/Navbar2";
import Signup from "./Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginUser } from "../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { setClicked } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
const Login2 = ({ ui, school }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupClicked, setSignupClicked] = useState(false);
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");

  const handleLogin = async () => {
    if (phone !== "" && pwd !== "") {
      try {
        const response = await LoginUser({ mobile_no: phone, password: pwd });
        if (response.status === 200) {
          if (response.data.user.is_active === 0) {
            toast.error("Your account is disabled. Please contact help centre");
          } else {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            dispatch(setClicked("homeClicked", true));
            navigate("/");
          }
        } else {
          toast.error("Invalid credentials");
          console.log(response);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Required fields are empty");
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />

      <div className="navbar-header-container">
        <Navbar2 ui={ui} school={school} />
      </div>
      <div
        className={`border-t-8 border-${ui.primary_clr} mx-auto my-24 max-w-md rounded-xl px-4 py-10 text-gray-700 shadow-lg sm:px-8`}
      >
        {signupClicked && (
          <Signup loginClicked={() => setSignupClicked(false)} />
        )}
        {!signupClicked && (
          <>
            <div className="mb-16 flex justify-between">
              <span className="font-bold">Skooler</span>
              <span className="">
                New here?{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                  onClick={() => setSignupClicked(true)}
                >
                  Sign up
                </a>
              </span>
            </div>
            <p className="mb-5 text-xl font-medium">Login here,</p>
            <p className="mb-6 text-sm"></p>
            <div className="mb-6 slideAnim  w-full">
              <div className="mb-4"></div>
              <div className="mb-4">
                <div className="relative mt-2 mr-1 w-full">
                  <input
                    type="text"
                    id="phone"
                    className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder=" "
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label
                    for="phone"
                    className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
                  >
                    {" "}
                    Phone Number
                  </label>
                </div>
              </div>
              <div className="mb-16">
                <div className="relative mt-2 mr-1 w-full">
                  <input
                    type="password"
                    id="pwd"
                    className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder=" "
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                  />
                  <label
                    for="pwd"
                    className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
                  >
                    {" "}
                    Password
                  </label>
                </div>
              </div>
            </div>
            <button
              className="text-blue-600 border hover:bg-blue-200 font-montserrat py-2 px-8 font-medium rounded-xl transition-all duration-300"
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        )}
      </div>
    </React.Fragment>
  );
};
export default Login2;
