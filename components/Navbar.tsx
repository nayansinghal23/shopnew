"use client";
import { getCartItems } from "@/actions/cart";
import { useCurrentUser } from "@/hooks/user";
import { Product } from "@/interface/types";
import { setCartProducts } from "@/redux/cartSlice";
import { setFilteredProducts, setSelectedProduct } from "@/redux/productSlice";
import { setSortBy } from "@/redux/sortBySlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const user = useCurrentUser();
  console.log("user", user);
  const dispatch = useAppDispatch();
  const cartProducts: Product[] = useAppSelector(
    (state: any) => state?.cart?.cartProducts
  );
  const [modal, setModal] = useState<boolean>(false);

  const addCartItems = async () => {
    const cartItems: any = await getCartItems();
    dispatch(setCartProducts(cartItems));
  };

  const handleModalToggle = () => {
    setModal((prev) => !prev);
  };

  useEffect(() => {
    addCartItems();
  }, []);

  return (
    <nav className="relative bg-gray-900 border-gray-700 flex p-3 justify-between items-center z-30">
      <Link href="/" className="text-white font-semibold">
        ShopNew
      </Link>
      <div
        className="rounded-full w-[25px] h-[25px] flex items-center justify-center hover:cursor-pointer"
        onClick={handleModalToggle}
      >
        {user?.image ? (
          <Image
            src={user?.image}
            alt="user-img"
            width={25}
            height={25}
            className="w-[25px] h-[25px] rounded-full object-fill"
          />
        ) : (
          <FaUserCircle color="white" className="w-full h-full" />
        )}
      </div>
      {modal && (
        <div className="absolute top-10 right-2 bg-gray-800 z-20 rounded-md w-40 flex flex-col gap-2 p-3">
          <Link
            className="flex gap-3 items-center justify-between"
            href={`/user/${user?.id}`}
          >
            <p className="text-white">My Profile</p>
          </Link>
          <Link
            className="flex gap-3 items-center justify-between"
            href="/cart"
          >
            <FaShoppingCart color="white" />
            <p className="text-white">{cartProducts.length}</p>
          </Link>
          <p
            className="text-white rounded-lg w-full font-semibold hover:cursor-pointer"
            onClick={() => {
              dispatch(setSortBy("Low to High Price"));
              dispatch(setFilteredProducts([]));
              dispatch(setSelectedProduct(""));
              setModal((prev) => !prev);
            }}
          >
            Low Price
          </p>
          <p
            className="text-white rounded-lg w-full font-semibold hover:cursor-pointer"
            onClick={() => {
              dispatch(setSortBy("High to Low Price"));
              dispatch(setFilteredProducts([]));
              dispatch(setSelectedProduct(""));
              setModal((prev) => !prev);
            }}
          >
            High Price
          </p>
          <button
            className="text-red-700 w-max font-semibold hover:cursor-pointer"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
