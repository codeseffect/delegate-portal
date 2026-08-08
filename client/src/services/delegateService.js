import axios from "axios";

const API = "http://localhost:5000/api/delegates";

// Get all delegates
export const getDelegates = async () => {
  const response = await axios.get(API);
  return response.data;
};

// Get one delegate
export const getDelegateById = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};

// Create delegate
export const createDelegate = async (delegateData) => {
  const response = await axios.post(API, delegateData);
  return response.data;
};

// Update delegate
export const updateDelegate = async (id, delegateData) => {
  const response = await axios.put(`${API}/${id}`, delegateData);
  return response.data;
};

// Delete delegate
export const deleteDelegate = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};