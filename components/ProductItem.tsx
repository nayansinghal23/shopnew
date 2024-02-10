import { addCartItem, deleteCartItem, getCartItems } from "@/actions/cart";
import { Product } from "@/interface/types";
import { setCartProducts } from "@/redux/cartSlice";
import { useAppDispatch } from "@/redux/store";
import Image from "next/image";
import toast from "react-hot-toast";

interface ProductProps {
  product: Product;
}

const ProductItem = ({ product }: ProductProps) => {
  const dispatch = useAppDispatch();
  const handleAddCartFunctionality = async () => {
    await addCartItem(product);
    toast.success("Item added successfully!");
    const cartItems = await getCartItems();
    dispatch(setCartProducts(cartItems));
  };

  const handleDeleteCartFunctionality = async () => {
    const response = await deleteCartItem(product);
    if (response === null) {
      toast.error("Item doesnot exist in cart!");
      return;
    }
    toast.success("Item removed successfully!");
    const cartItems = await getCartItems();
    dispatch(setCartProducts(cartItems));
  };

  return (
    <div className="p-2 border-2 border-black rounded-md bg-[#FCEEC0] text-black flex flex-col items-center gap-2">
      <Image
        src={product.thumbnail}
        alt={`item${product.id}`}
        width={100}
        height={100}
        className="w-auto h-auto"
      />
      <p className="text-[15px] sm:text-[18px] font-semibold">
        {product.title}
      </p>
      <p>{product.description}</p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-center">
        <p className="font-semibold">Price : {product.price}Rs</p>
        <p className="font-semibold">Rating : {product.rating}</p>
        <button
          className="font-semibold border border-black p-2 rounded-lg"
          onClick={() => {
            handleAddCartFunctionality();
          }}
        >
          Add
        </button>
        <button
          className="font-semibold border border-black p-2 rounded-lg"
          onClick={() => {
            handleDeleteCartFunctionality();
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
