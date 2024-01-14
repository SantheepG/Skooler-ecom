import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [nextBtnClicked, setNextBtnClicked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    student_id: "",
    mobile_no: "",
    email: "",
    password: "",
  });

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
    setFormData({
      name: "",
      student_id: "",
      mobile_no: "",
      email: "",
      password: "",
    });
  };

  const handleLogInClick = () => {
    setIsSignUpActive(false);
    setFormData({
      name: "",
      student_id: "",
      mobile_no: "",
      email: "",
      password: "",
    });
  };

  const handleNextClick = async () => {
    if (
      formData.email === "" ||
      formData.mobile_no === "" ||
      formData.name === "" ||
      formData.student_id === ""
    ) {
      toast.error("Required fields are empty", {
        duration: 1200,
        position: "top-center",
        //icon: "❌",
      });
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/checkid",
          {
            student_id: formData.student_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 202) {
          setNextBtnClicked(true);
        } else {
          toast.error("invalid student id", {
            duration: 1200,
            position: "top-center",
            //icon: "❌",
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Account successfully created", {
          duration: 1500,
          position: "top-center",
          //icon: "❌",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1800);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      if (formData.mobile_no !== "" && formData.password !== "") {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/login",
          {
            mobile_no: formData.mobile_no,
            password: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          //toast.success("Login success");
          if (response.data.user.is_active === 0) {
            console.error(
              "Your account is disabled. Please contact help centre"
            );
            toast.error(
              "Your account is disabled. Please contact help centre",
              {
                duration: 1600,
                position: "top-center",
                //icon: "❌",
              }
            );
          } else {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/");
          }
        }
      } else {
        console.error("Required fields are empty");
        toast.error("Required fields are empty", {
          duration: 1200,
          position: "top-center",
          //icon: "❌",
        });
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Invalid mobile number or password", {
        duration: 1500,
        position: "top-center",
        //icon: "❌",
      });
    }
  };

  return (
    <React.Fragment>
      <div className="Login-parent-container">
        <div className="container">
          <Toaster className="notifier" />
          <div
            className={
              isSignUpActive ? "container right-panel-active" : "container"
            }
            id="container"
          >
            <div className="form-container sign-up-container">
              <div className="form">
                {nextBtnClicked ? (
                  <div className="pswd-container">
                    <h1>Enter your password</h1>
                    <div
                      class="mb-5 mt-10 ml-16 mr-20"
                      data-te-input-wrapper-init
                    >
                      <div>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Confirm password"
                          class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex mt-20 ml-20">
                      <button
                        type="button"
                        class="mr-10 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        onClick={() => setNextBtnClicked(!nextBtnClicked)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        onClick={handleSignUp}
                      >
                        Signup
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1>Create an Account</h1>
                    <div class="w-full mb-6 mt-10" data-te-input-wrapper-init>
                      <div>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Name"
                          class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          name="student_id"
                          id="student_id"
                          placeholder="Student ID"
                          class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                          value={formData.student_id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              student_id: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          name="phone_no"
                          id="phone_no"
                          placeholder="Phone Number"
                          class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                          value={formData.mobile_no}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mobile_no: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                      onClick={handleNextClick}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div class="form-container sign-in-container">
              <div className="form">
                <h1>Login</h1>

                <div class="w-full mb-6 mt-10 px-16" data-te-input-wrapper-init>
                  <div>
                    <input
                      type="text"
                      name="phone_no"
                      id="phone_no"
                      placeholder="Phone number"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={formData.mobile_no}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile_no: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                </div>

                <a className="forget-password" href="#">
                  Forgot your password?
                </a>
                <button
                  type="button"
                  class="hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 "
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
            <div class="overlay-container">
              <div class="overlay">
                <div class="overlay-panel overlay-left">
                  <h1>Create an Account</h1>
                  <p>Create an account and start journey with us</p>
                  <p>Already have an account?</p>
                  <button class="ghost" id="signIn" onClick={handleLogInClick}>
                    Login
                  </button>
                </div>
                <div class="overlay-panel overlay-right">
                  <h1>Hello</h1>
                  <p>New here? </p>
                  <button class="ghost" id="signUp" onClick={handleSignUpClick}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>

          <footer></footer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
