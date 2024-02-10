"use server";
import { Product } from "@/interface/types";
import { prismadb } from "@/lib/db";

export const addCartItem = async (product: Product) => {
  const existingItem = await prismadb.cartProduct.findUnique({
    where: {
      itemId: product.id,
    },
  });
  if (existingItem) {
    await prismadb.cartProduct.update({
      where: {
        itemId: existingItem.itemId,
      },
      data: {
        present: existingItem.present + 1,
      },
    });
  } else {
    await prismadb.cartProduct.create({
      data: {
        itemId: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        rating: product.rating,
        brand: product.brand,
        category: product.category,
        present: 1,
      },
    });
  }
};

export const deleteCartItem = async (product: Product) => {
  const existingItem = await prismadb.cartProduct.findUnique({
    where: {
      itemId: product.id,
    },
  });
  if (!existingItem || existingItem?.present === 0) {
    return null;
  }
  if (existingItem.present === 1) {
    await prismadb.cartProduct.delete({
      where: {
        itemId: existingItem.itemId,
      },
    });
  } else {
    await prismadb.cartProduct.update({
      where: {
        itemId: existingItem.itemId,
      },
      data: {
        present: existingItem.present - 1,
      },
    });
  }
};

export const getCartItems = async () => {
  const cartItems = await prismadb.cartProduct.findMany({});
  return cartItems;
};
