import axios from "axios";
import { base_URL2 } from "../App";
import { schoolID } from "../App";

export const FetchSchool = async () => {
  try {
    const response = await axios.get(
      `${base_URL2}/super/getschool/${schoolID}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
