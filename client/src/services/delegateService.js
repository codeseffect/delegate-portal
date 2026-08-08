import axios from "axios";

const API = "http://localhost:5000/api/delegates";

export const getDelegates = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const getDelegateById = async (id) => {
  const response = await axios.get(
    `http://localhost:5000/api/delegates/${id}`
  );

  return response.data;
};