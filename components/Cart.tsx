import { clearCartProduct, getCartItems } from "@/actions/cart";
import { CartProduct } from "@/interface/types";
import { setCartProducts } from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartProducts: CartProduct[] = useAppSelector(
    (state: any) => state?.cart?.cartProducts
  );
  const [loading, setLoading] = useState<boolean>(false);

  const addCartItems = async () => {
    const cartItems: any = await getCartItems();
    dispatch(setCartProducts(cartItems));
  };

  const handleClearItem = async (item: CartProduct) => {
    setLoading(true);
    toast.loading("Deleting may take some time!", {
      duration: 3000,
    });
    const deletedProduct: any = await clearCartProduct(item);
    if (!deletedProduct) {
      setLoading(false);
      toast.error("Something unexpected occurs!");
      return;
    }
    const cartItems: any = await getCartItems();
    dispatch(setCartProducts(cartItems));
    toast.success("Successfully removed from cart!");
    setLoading(false);
  };

  useEffect(() => {
    addCartItems();
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-0 z-30 w-full flex justify-between items-center p-3 bg-gray-900">
        <Link href="/" className="font-semibold text-white">
          Home
        </Link>
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50">
          Pay
        </button>
        <Link href="/cart" className="flex gap-2 items-center text-white">
          <FaShoppingCart />
          {cartProducts.length}
        </Link>
      </div>
      {cartProducts.length === 0 ? (
        <div className="mt-16 flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3">
          <p className="font-semibold">Cart is Empty</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-16">
          {cartProducts.map((item: CartProduct) => (
            <div
              key={item.id}
              className="relative w-full p-3 rounded-md border-2 border-black bg-sky-300 flex items-center justify-between"
            >
              <div className="hidden sm:block">
                <Image
                  width={200}
                  height={200}
                  src={item.thumbnail}
                  alt={`cart-item${item.id}`}
                  className="w-auto h-auto"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="font-semibold">{item.title}</p>
                <p>
                  <span className="font-semibold">Items chosen</span>:{" "}
                  {item.present}
                </p>
                <p>
                  <span className="font-semibold">Price</span>: {item.price} Rs
                </p>
              </div>
              <button
                className="absolute top-0 right-0"
                onClick={() => {
                  handleClearItem(item);
                }}
                disabled={loading}
              >
                <MdOutlineCancel size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
