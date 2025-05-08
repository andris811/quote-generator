import axios from "axios";
import { Quote } from "../types/Quote";

const API_URL = "http://localhost:5050/api/quotes"; // change if deployed

// Get all saved quotes
export const getSavedQuotes = async (): Promise<Quote[]> => {
  const res = await axios.get(`${API_URL}/saved`);
  return res.data;
};

// Save a new quote
export const saveQuote = async (quote: Omit<Quote, "id">): Promise<Quote> => {
  const res = await axios.post(`${API_URL}/saved`, quote);
  return res.data;
};

// Delete a quote by ID
export const deleteQuote = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/saved/${id}`);
};

// Toggle pin/unpin
export const togglePin = async (id: string): Promise<Quote> => {
  const res = await axios.put(`${API_URL}/saved/${id}/pin`);
  return res.data;
};
