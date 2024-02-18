import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ValidationCheck, SignupUser } from "../../api/AuthAPI";
const Signup = ({ loginClicked }) => {
  const [nextClicked, setNextClikced] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState("");
  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    student_id: "",
    mobile_no: "",
    email: "",
    password: "",
    is_active: true,
  });

  const handleNextClick = async () => {
    let message = "";
    if (
      signupData.fname !== "" &&
      signupData.surname !== "" &&
      signupData.student_id !== "" &&
      signupData.mobile_no !== "" &&
      signupData.email !== ""
    ) {
      const response = await ValidationCheck({
        mobile_no: signupData.mobile_no,
        email: signupData.email,
        student_id: signupData.student_id,
      });
      if (response.status === 200) {
        if (response.data.message.phone && response.data.message.email) {
          setNextClikced(true);
        } else {
          if (!response.data.message.phone) {
            if (!response.data.message.email) {
              message = "Phone number & email already exist";
            } else {
              message = "Phone number already exists";
            }
          }
          if (!response.data.message.email) {
            message = "Email already exists";
          }
          toast.error(message);
        }
      } else {
        console.log(response);
        toast.error("Invalid student ID");
      }
    } else {
      toast.error("Required fields are empty");
    }
  };

  const handleSignup = async () => {
    if (signupData.password === confirmPwd) {
      if (confirmPwd.length >= 8) {
        try {
          const response = await SignupUser(signupData);
          if (response.status === 201) {
            toast.success("Account successfully created");
            setTimeout(() => {
              loginClicked();
            }, 1500);
          } else {
            toast.error("Something went wrong");
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Password should be at least 8 characters long");
      }
    } else {
      toast.error("Password didn't match. Please check");
    }
  };
  return (
    <React.Fragment>
      <ToastContainer />
      {!nextClicked && (
        <>
          <div class="mb-16 flex justify-between">
            <span class="font-bold">Skooler</span>
            <span class="">
              Have account?{" "}
              <a
                href="#"
                class="font-medium text-blue-600 hover:underline"
                onClick={loginClicked}
              >
                Log in
              </a>
            </span>
          </div>
          <p class="mb-5 text-xl  font-medium">
            Create an account & start shopping!
          </p>

          <div class="mb-6 w-full slideAnim">
            <div class="mb-4 w-full flex">
              <div className="w-1/2">
                <div class="relative mt-2 mr-1 w-full">
                  <input
                    type="text"
                    id="fname"
                    class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder=" "
                    value={signupData.first_name}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        first_name: e.target.value,
                      })
                    }
                  />
                  <label
                    for="fname"
                    class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
                  >
                    {" "}
                    First name
                  </label>
                </div>
              </div>
              <div className="w-1/2">
                <div class="relative mt-2 ml-1 w-full">
                  <input
                    type="text"
                    id="surname"
                    class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder=" "
                    value={signupData.last_name}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        last_name: e.target.value,
                      })
                    }
                  />
                  <label
                    for="surname"
                    class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
                  >
                    {" "}
                    Surname
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div class="relative mt-2 mr-1 w-full">
                <input
                  type="text"
                  id="id"
                  class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  value={signupData.student_id}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      student_id: e.target.value,
                    })
                  }
                />
                <label
                  for="id"
                  class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
                >
                  {" "}
                  Student ID
                </label>
              </div>
            </div>
            <div className="mb-4">
              <div class="relative mt-2 mr-1 w-full">
                <input
                  type="email"
                  id="email"
                  class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      email: e.target.value,
                    })
                  }
                />
                <label
                  for="email"
                  class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
                >
                  {" "}
                  Email
                </label>
              </div>
            </div>
            <div className="mb-4">
              <div class="relative mt-2 mr-1 w-full">
                <input
                  type="text"
                  id="phone"
                  class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  value={signupData.mobile_no}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      mobile_no: e.target.value,
                    })
                  }
                />
                <label
                  for="phone"
                  class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
                >
                  {" "}
                  Phone number
                </label>
              </div>
            </div>
          </div>
          <button
            class="text-blue-600 border hover:bg-blue-200 font-montserrat py-2 px-8 font-medium rounded-xl transition-all duration-300"
            onClick={handleNextClick}
          >
            Next
          </button>
        </>
      )}
      {nextClicked && (
        <>
          <div class="mb-16 flex justify-between">
            <span class="font-bold">Skooler</span>
            <span class="">
              Have account?{" "}
              <a
                href="#"
                class="font-medium text-blue-600 hover:underline"
                onClick={loginClicked}
              >
                Log in
              </a>
            </span>
          </div>
          <p class="mb-5 text-xl slideAnim font-medium">
            Enter a strong password to secure your account
          </p>

          <div class="mb-6 w-full slideAnim">
            <div class="relative mt-2 mr-1 w-full">
              <input
                type="password"
                id="pwd"
                class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    password: e.target.value,
                  })
                }
              />
              <label
                for="pwd"
                class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {" "}
                Password
              </label>
            </div>
            <div class="relative mt-6 mr-1 w-full mb-8">
              <input
                type="password"
                id="confirm-pwd"
                class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
              <label
                for="confirm-pwd"
                class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {" "}
                Confirm Password
              </label>
            </div>
          </div>
          <button
            class="text-blue-600 border hover:bg-blue-200 font-montserrat py-2 px-8 font-medium rounded-xl transition-all duration-300"
            onClick={handleSignup}
          >
            Signup
          </button>
        </>
      )}
    </React.Fragment>
  );
};
export default Signup;
