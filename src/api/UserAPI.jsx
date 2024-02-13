import axios from "axios";

export const FetchUser = async () => {
  try {
    let tkn = localStorage.getItem("token");
    const response = await axios.get("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${tkn} `,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchOrders = async (id) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/user/orders",
      { user_id: parseInt(id) },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      return response;
    } else {
      return "error";
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const lodgeAComplaint = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/user/complaint/lodge",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      return response;
    } else {
      return "error";
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchComplaints = async (id) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/user/complaints",
      {
        user_id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      return response;
    } else {
      return "error";
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchReviews = async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/reviews/${id}`
    );
    if (response) {
      return response;
    } else {
      return "error";
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const UpdateName = async (data) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:8000/api/user/update/name",
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

export const UpdateAddress = async (data) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:8000/api/user/update/address",
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

export const UpdatePassword = async (data) => {
  try {
    let tkn = localStorage.getItem("token");
    const response = await axios.put(
      "http://127.0.0.1:8000/api/user/reset",
      data,
      {
        headers: {
          Authorization: `Bearer ${tkn} `,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteReview = async (id) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/user/review/delete/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const AddCard = async (data) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/user/card/add`,
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

export const FetchCards = async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/card/${id}`
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const FetchNotifications = async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/notifics/${id}`
    );

    return response;
  } catch (error) {
    return error;
  }
};
