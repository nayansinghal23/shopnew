"use server";
import { auth } from "@/auth";
import { CartProduct, Product } from "@/interface/types";
import { prismadb } from "@/lib/db";

export const addCartItem = async (product: Product) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  const existingItem = await prismadb.cartProduct.findUnique({
    where: {
      userId_itemId: {
        userId,
        itemId: product.id,
      },
    },
  });
  if (existingItem) {
    await prismadb.cartProduct.update({
      where: {
        userId_itemId: {
          itemId: existingItem.itemId,
          userId,
        },
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
      userId_itemId: {
        userId,
        itemId: product.id,
      },
    },
  });
  if (!existingItem || existingItem?.present === 0) {
    return null;
  }
  if (existingItem.present === 1) {
    await prismadb.cartProduct.delete({
      where: {
        userId_itemId: {
          userId,
          itemId: existingItem.itemId,
        },
      },
    });
  } else {
    await prismadb.cartProduct.update({
      where: {
        userId_itemId: {
          userId,
          itemId: existingItem.itemId,
        },
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

export const clearCartProduct = async (product: CartProduct) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const deletedProduct = await prismadb.cartProduct.delete({
    where: {
      userId_itemId: {
        userId,
        itemId: product.itemId,
      },
    },
  });
  return deletedProduct;
};
