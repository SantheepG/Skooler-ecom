import React, { useState, useEffect, useRef } from "react";
import "./Profile.css";
import { base_URL } from "../../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DeleteView from "./DeleteView";
import {
  UpdateAddress,
  UpdateAvatar,
  UpdateName,
  UpdatePassword,
} from "../../../api/UserAPI";

const Profile = ({ userData, reload }) => {
  const fileInputRef = useRef(null);

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [viewResetPwd, setViewResetPwd] = useState(false);
  const [nameChangeClicked, setNameChangeClicked] = useState(false);
  const [addressChangeClicked, setAddressChangeClicked] = useState(false);
  const [viewAvatarChange, setViewAvatarChange] = useState(false);
  const [formData, setFormData] = useState(null);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [updateData, setUpdateData] = useState(null);
  const viewModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOutsideClick = (event) => {
    if (event.target.className === "modal") {
      setIsModalOpen(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const UpdateProfileInfo = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Required fields are empty");
      console.log(formData);
      return;
    }

    const data = {
      id: userData.id,
      name: formData.name,
      email: formData.email,
    };

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/update",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile updated:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Profile successfully updated", {
        duration: 3000,
        position: "top-center",
        //icon: "❌",
      });
      viewModal();
      // Handle success or redirect as needed
    } catch (error) {
      console.error("Error updating profile:", error.message);
      // Handle error scenario
    }
  };

  const updateName = async () => {
    try {
      if (updateData.first_name !== "" && updateData.last_name !== null) {
        const response = await UpdateName({
          id: userData.id,
          first_name: updateData.first_name,
          last_name: updateData.last_name,
        });
        if (response.status === 200) {
          toast.success("Updated", {
            position: "bottom-right", // You can change this to other positions
          });
          setNameChangeClicked(!nameChangeClicked);
          reload();
        } else {
          toast.error("Something went wrong", {
            position: "bottom-right", // You can change this to other positions
          });
        }
      } else {
        toast.error("Fields are empty", {
          position: "bottom-right", // You can change this to other positions
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateAddress = async () => {
    try {
      if (address1 !== "" || address2 !== "" || address3 !== "") {
        let address = JSON.stringify({
          address1: address1,
          address2: address2,
          address3: address3,
        });
        const response = await UpdateAddress({
          id: userData.id,
          address: address,
        });

        if (response.status === 200) {
          toast.success("Updated", {
            position: "bottom-right", // You can change this to other positions
          });
          setAddressChangeClicked(!addressChangeClicked);
          reload();
        } else {
          toast.error("Something went wrong", {
            position: "bottom-right", // You can change this to other positions
          });
        }
      } else {
        toast.error("Fields are empty", {
          position: "bottom-right", // You can change this to other positions
        });
      }
    } catch (error) {}
  };

  const updatePwd = async () => {
    try {
      if (currentPwd !== "" && newPwd !== "") {
        let data = {
          id: userData.id,
          current_password: currentPwd,
          new_password: newPwd,
        };
        const response = await UpdatePassword(data);

        if (response.status === 200) {
          toast.success("Updated", {
            position: "bottom-right", // You can change this to other positions
          });
          setViewResetPwd(!viewResetPwd);
          reload();
        } else {
          toast.error("Passwords didn't match ", {
            position: "bottom-right", // You can change this to other positions
          });
        }
      } else {
        toast.error("Fields are empty", {
          position: "bottom-right", // You can change this to other positions
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-right", // You can change this to other positions
      });
    }
  };
  useEffect(() => {
    if (userData !== null) {
      setUpdateData(userData);
      if (userData.address !== null) {
        let address = JSON.parse(userData.address);
        setAddress1(address.address1);
        setAddress2(address.address2);
        setAddress3(address.address3);
      }
      setLogoPreview(`${base_URL}/user/avatar/get/${userData.id}`);
    }
  }, [userData]);

  const handleAvatarChange = async (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    setLogo(selectedFile);
    // Create a FileReader to read the selected file
    const reader = new FileReader();

    reader.onloadend = () => {
      // Set the preview URL

      // Create an Image element to get the natural dimensions of the image
      const image = new Image();
      image.src = reader.result;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = image.width;
        let height = image.height;
        const MAX_WIDTH = 300; // Set your desired maximum width
        const MAX_HEIGHT = 300; // Set your desired maximum height

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(image, 0, 0, width, height);

        // Append the canvas to the DOM or use the canvas to generate a data URL
        // Example: document.body.appendChild(canvas);
        // Or: const canvasDataURL = canvas.toDataURL("image/jpeg");
      };
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile); // Read the file as a data URL
    }
    try {
      const formData = new FormData();
      //formData.append("_method", "PUT");
      formData.append("user_id", userData.id);
      formData.append("avatar", event.target.files[0]);
      const response = await UpdateAvatar(formData);

      if (response.status === 200) {
        toast.success("Updated", {
          position: "bottom-right", // You can change this to other positions
        });

        setTimeout(() => {
          reload();
          setLogoPreview(reader.result);
          setViewAvatarChange(false);
        }, 500);
      } else {
        toast.error("File is too large", {
          position: "bottom-right", // You can change this to other positions
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <React.Fragment>
      {updateData &&
        (deleteClicked ? (
          <DeleteView cancel={() => setDeleteClicked(false)} />
        ) : (
          <div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow ViewContent">
            <ToastContainer />{" "}
            <div class="pt-4">
              <h1 class="py-2 text-2xl font-semibold">Profile</h1>
              <p class="font- text-slate-600"></p>
            </div>
            <hr class="mt-4 mb-8" />
            <p class="py-2 text-xl font-semibold">Personal</p>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Name :{" "}
                <strong>
                  {updateData.first_name + " "}
                  {updateData.last_name !== null ? updateData.last_name : ""}
                </strong>
              </p>

              <button
                class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
                onClick={() => {
                  setNameChangeClicked(!nameChangeClicked);
                  setAddressChangeClicked(false);
                  setViewResetPwd(false);
                  setViewAvatarChange(false);
                }}
              >
                Change
              </button>
            </div>
            <div
              className={`${
                nameChangeClicked ? "mt-2 mb-4" : "hidden"
              } flex items-center SlideDown`}
            >
              <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <label for="First name">
                  <span class="text-sm text-gray-500">First name</span>
                  <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type="text"
                      id="First-name"
                      class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      value={updateData.first_name}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </div>
                </label>
                <label for="Surname">
                  <span class="text-sm text-gray-500">Surname</span>
                  <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type="text"
                      id="Surname"
                      class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      value={
                        updateData.last_name !== null
                          ? updateData.last_name
                          : ""
                      }
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </div>
                </label>
              </div>

              <button
                className="mt-4 ml-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
                onClick={updateName}
              >
                Update
              </button>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Email : <strong>{userData.email}</strong>
              </p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Mobile numuber : <strong>{userData.mobile_no}</strong>
              </p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">Address :</p>
              <button
                class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
                onClick={() => {
                  setAddressChangeClicked(!addressChangeClicked);
                  setNameChangeClicked(false);
                  setViewResetPwd(false);
                  setViewAvatarChange(false);
                }}
              >
                Change
              </button>
            </div>
            <div>
              <span className="text-sm text-gray-600">
                Address 1 : {address1}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600">
                Address 2 : {address2}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600">
                Address 3 : {address3}
              </span>
            </div>
            <div
              className={`${
                addressChangeClicked ? "mt-2 mb-4" : "hidden"
              } flex items-center SlideDown`}
            >
              <div class="space-y-2 w-1/2 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="ml-3">
                  <label for="address1">
                    <span class="text-sm text-gray-500">Address 1</span>
                    <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                      <input
                        type="text"
                        id="address1"
                        className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                  </label>
                </div>
                <div>
                  <label for="address2">
                    <span class="text-sm text-gray-500">Address 2</span>
                    <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                      <input
                        type="text"
                        id="address2"
                        className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>
                  </label>
                </div>
                <div>
                  <label for="address3">
                    <span class="text-sm text-gray-500">Address 3</span>
                    <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                      <input
                        type="text"
                        id="address3"
                        class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                        value={address3}
                        onChange={(e) => setAddress3(e.target.value)}
                      />
                    </div>
                  </label>
                </div>
              </div>

              <button
                className="mt-4 ml-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
                onClick={updateAddress}
              >
                Update
              </button>
            </div>
            <hr class="mt-4 mb-8" />
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="py-2 text-xl font-semibold">Profile picture</p>
              <button
                class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
                onClick={() => {
                  setViewAvatarChange(!viewAvatarChange);
                  setViewResetPwd(false);
                  setAddressChangeClicked(false);
                  setNameChangeClicked(false);
                }}
              >
                Change
              </button>
            </div>
            <div
              className={`${
                viewAvatarChange ? "" : "hidden"
              } flex items-center SlideDown`}
            >
              <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <div class="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
                  <img src={logoPreview} class="h-16 w-16 rounded-full" />
                  <p class="text-sm text-gray-600">
                    Drop your desired image file here to start the upload
                  </p>
                  <input
                    type="file"
                    class="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>

              <button class="mt-4 ml-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
                Update
              </button>
            </div>
            <hr class="mt-4 mb-8" />
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="py-2 text-xl font-semibold">Password</p>
              <button
                class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
                onClick={() => {
                  setViewResetPwd(!viewResetPwd);
                  setAddressChangeClicked(false);
                  setNameChangeClicked(false);
                  setViewAvatarChange(false);
                }}
              >
                Change
              </button>
            </div>
            <div
              className={`${
                viewResetPwd ? "" : "hidden"
              } flex items-center SlideDown`}
            >
              <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <label for="login-password">
                  <span class="text-sm text-gray-500">Current Password</span>
                  <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type="password"
                      id="login-password"
                      class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="***********"
                      onChange={(e) => setCurrentPwd(e.target.value)}
                    />
                  </div>
                </label>
                <label for="login-password">
                  <span class="text-sm text-gray-500">New Password</span>
                  <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type="password"
                      id="login-password"
                      class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="***********"
                      onChange={(e) => setNewPwd(e.target.value)}
                    />
                  </div>
                </label>
              </div>

              <button
                class="mt-4 ml-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
                onClick={updatePwd}
              >
                Update password
              </button>
            </div>
            <hr class="mt-4 mb-8" />
            <div class="mb-10">
              <p class="py-2 text-xl font-semibold">Delete Account</p>
              <p class="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Proceed with caution
              </p>
              <p class="mt-2">
                Your data will be completely wiped out. Are you sure, you want
                to still continue?
              </p>
              <button
                class="ml-auto text-sm font-semibold text-rose-600 underline decoration-2"
                onClick={() => setDeleteClicked(true)}
              >
                Continue with deletion
              </button>
            </div>
          </div>
        ))}
    </React.Fragment>
  );
};

export default Profile;
