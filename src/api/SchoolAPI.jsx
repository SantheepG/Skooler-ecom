import axios from "axios";
const schoolID = "SC-24";
export const FetchSchool = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8080/api/super/getschool/${schoolID}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
