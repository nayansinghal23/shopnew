"use server";
import axios from "axios";

const api = "https://dummyjson.com/products?limit=100";

export const getAllProducts = async () => {
  const response = await axios.get(api);
  const data = await response.data;
  return data?.products;
};
