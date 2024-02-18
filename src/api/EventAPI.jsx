import axios from "axios";
import { base_URL } from "../App";

export const FetchEvents = async () => {
  try {
    const response = await axios.get(`${base_URL}/events/fetch`);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetEvent = async (id) => {
  try {
    const response = await axios.get(`${base_URL}/event/get/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
