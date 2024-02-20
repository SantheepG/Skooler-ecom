import axios from "axios";
import { base_URL } from "../App";

export const LoginUser = async (data) => {
  try {
    const response = await axios.post(`${base_URL}/user/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const SignupUser = async (data) => {
  try {
    const response = await axios.post(`${base_URL}/user/signup`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const ValidationCheck = async (data) => {
  try {
    const response = await axios.post(
      `${base_URL}/user/signup/validate`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const FetchUser = async () => {
  try {
    let tkn = localStorage.getItem("token");
    const response = await axios.get(`${base_URL}/user`, {
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
