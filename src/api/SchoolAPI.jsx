import axios from "axios";
export const schoolID = "SC-24";
export const base_URL = "http://127.0.0.1:8080/api";
export const FetchSchool = async () => {
  try {
    const response = await axios.get(`${base_URL}/super/getschool/${schoolID}`);
    return response;
  } catch (error) {
    return error;
  }
};
