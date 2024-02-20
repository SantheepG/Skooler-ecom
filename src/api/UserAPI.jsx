import axios from "axios";
import { base_URL } from "../App";

export const UpdateAvatar = async (formData) => {
  try {
    const response = await axios.post(
      `${base_URL}/user/avatar/update`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const AddToCart = async (data) => {
  try {
    const reponse = await axios.post(`${base_URL}/cart/add`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return reponse;
  } catch (error) {
    return error;
  }
};
export const ReviewProduct = async (data) => {
  try {
    const response = await axios.post(`${base_URL}/product/rate`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
        Authorization: `Bearer ${tkn} `,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const FetchCart = async (userId) => {
  try {
    const response = await axios.get(`${base_URL}/cart/${userId}`);
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
export const FetchOrders = async (userId) => {
  try {
    const response = await axios.get(`${base_URL}/user/orders/${userId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const LodgeAComplaint = async (data) => {
  try {
    const response = await axios.post(
      `${base_URL}/user/complaint/lodge`,
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
    console.error(error);
  }
};
export const QtyChange = async (productId, qty, price) => {
  try {
    const response = await axios.put(
      `${base_URL}/updatecart/${productId}/${qty}/${price}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const FetchComplaints = async (userId) => {
  try {
    const response = await axios.get(`${base_URL}/user/complaints/${userId}`);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchReviews = async (userId) => {
  try {
    const response = await axios.get(`${base_URL}/user/reviews/${userId}`);
    if (response) {
      return response;
    } else {
      return "error";
    }
  } catch (error) {
    console.error(error.message);
  }
};
export const FetchNotifications = async (userId) => {
  try {
    const response = await axios.get(
      `${base_URL}/user/notifications/fetch/${userId}`
    );

    return response;
  } catch (error) {
    return error;
  }
};
export const ChangeNotificationStatus = async (id) => {
  try {
    const response = await axios.get(
      `${base_URL}/user/notifications/change/${id}`
    );

    return response;
  } catch (error) {
    return error;
  }
};
export const UpdateName = async (data) => {
  try {
    const response = await axios.put(`${base_URL}/user/update/name`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateAddress = async (data) => {
  try {
    const response = await axios.put(`${base_URL}/user/update/address`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdatePassword = async (data) => {
  try {
    let tkn = localStorage.getItem("token");
    const response = await axios.put(`${base_URL}/user/reset`, data, {
      headers: {
        Authorization: `Bearer ${tkn} `,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteReview = async (id) => {
  try {
    const response = await axios.delete(`${base_URL}/user/review/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const AddCard = async (data) => {
  try {
    const response = await axios.post(`${base_URL}/user/card/add`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const FetchCards = async (userId) => {
  try {
    const response = await axios.get(`${base_URL}/user/card/${userId}`);

    return response;
  } catch (error) {
    return error;
  }
};
