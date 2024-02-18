import axios from "axios";
import { base_URL } from "../App";

export const FetchRelatedProducts = async (id) => {
  try {
    const response = await axios.get(`${base_URL}/products/related/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const FetchProduct = async (id) => {
  try {
    const response = await axios.get(`${base_URL}/product/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const SearchResults = async (data) => {
  try {
    const response = await axios.post(`${base_URL}/search`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
