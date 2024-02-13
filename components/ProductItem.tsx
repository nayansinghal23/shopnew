import { addCartItem, deleteCartItem, getCartItems } from "@/actions/cart";
import { Product } from "@/interface/types";
import { setCartProducts } from "@/redux/cartSlice";
import { useAppDispatch } from "@/redux/store";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductProps {
  product: Product;
}

const ProductItem = ({ product }: ProductProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const handleAddCartFunctionality = async () => {
    setLoading(true);
    toast.loading("Adding...", {
      duration: 500,
    });
    await addCartItem(product);
    const cartItems: any = await getCartItems();
    dispatch(setCartProducts(cartItems));
    toast.success("Item added successfully!");
    setLoading(false);
  };

  const handleDeleteCartFunctionality = async () => {
    setLoading(true);
    toast.loading("Deleting...", {
      duration: 500,
    });
    const response = await deleteCartItem(product);
    if (response === null) {
      setLoading(false);
      toast.error("Item doesnot exist in cart!");
      return;
    }
    const cartItems: any = await getCartItems();
    dispatch(setCartProducts(cartItems));
    toast.success("Item removed successfully!");
    setLoading(false);
  };

  return (
    <div className="p-2 border-2 border-black rounded-md bg-[#FCEEC0] text-black flex flex-col items-center gap-2">
      <div className="flex justify-between items-center w-full sm:flex-col">
        <div className="">
          <Image
            src={product.thumbnail}
            alt={`item${product.id}`}
            width={100}
            height={100}
            className="w-auto h-auto"
          />
        </div>
        <div className="flex items-center flex-col">
          <p className="text-[15px] sm:text-[18px] font-semibold">
            {product.title}
          </p>
          <p className="hidden sm:block">{product.description}</p>
          <p className="font-semibold">Price : {product.price}Rs</p>
          <p className="font-semibold">Rating : {product.rating}</p>
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-45"
          onClick={() => {
            handleAddCartFunctionality();
          }}
          disabled={loading}
        >
          Add
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50"
          onClick={() => {
            handleDeleteCartFunctionality();
          }}
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
