"use server";
import { auth } from "@/auth";
import { Product } from "@/interface/types";
import { prismadb } from "@/lib/db";

export const addCartItem = async (product: Product) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  const existingItems = await prismadb.cartProduct.findMany({
    where: {
      itemId: product.id,
    },
  });
  const existingItem = existingItems.filter(
    (item) => item.userId === userId
  )[0];
  if (existingItem) {
    await prismadb.cartProduct.update({
      where: {
        itemId: existingItem.itemId,
        userId,
      },
      data: {
        present: existingItem.present + 1,
      },
    });
  } else {
    await prismadb.cartProduct.create({
      data: {
        userId,
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
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  const existingItem = await prismadb.cartProduct.findUnique({
    where: {
      userId,
      itemId: product.id,
    },
  });
  if (!existingItem || existingItem?.present === 0) {
    return null;
  }
  if (existingItem.present === 1) {
    await prismadb.cartProduct.delete({
      where: {
        userId,
        itemId: existingItem.itemId,
      },
    });
  } else {
    await prismadb.cartProduct.update({
      where: {
        userId,
        itemId: existingItem.itemId,
      },
      data: {
        present: existingItem.present - 1,
      },
    });
  }
};

export const getCartItems = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  const cartItems = await prismadb.cartProduct.findMany({
    where: {
      userId,
    },
  });
  return cartItems;
};
