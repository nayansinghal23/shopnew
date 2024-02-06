"use server";
import axios from "axios";

export const getAllProducts = async (skip: number, limit: number = 10) => {
  const api = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
  const response = await axios.get(api);
  const data = await response.data;
  return data?.products;
};
