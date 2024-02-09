"use server";
import axios from "axios";

export const getAllProducts = async (skip: number, limit: number = 10) => {
  const api = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
  const response = await axios.get(api);
  const data = await response.data;
  return data?.products;
};

export const getLowToHighPriceSortedProducts = async (
  skip: number = 0,
  limit: number = 100
) => {
  const api = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
  const response = await axios.get(api);
  const data = await response.data;
  const products = data?.products;
  products.sort((a: any, b: any) => a.price - b.price);
  return products;
};

export const getHighToLowPriceSortedProducts = async (
  skip: number = 0,
  limit: number = 100
) => {
  const api = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
  const response = await axios.get(api);
  const data = await response.data;
  const products = data?.products;
  products.sort((a: any, b: any) => b.price - a.price);
  return products;
};

export const getProductsSortedByPrice = async (
  order: "D" | "A",
  from: number,
  till: number
) => {
  let products = [];
  if (order === "D") {
    products = await getHighToLowPriceSortedProducts();
  } else {
    products = await getLowToHighPriceSortedProducts();
  }
  return products.slice(from, till);
};
