"use client";
import { getCartItems } from "@/actions/cart";
import { list } from "@/constants";
import { Product } from "@/interface/types";
import { setCartProducts } from "@/redux/cartSlice";
import { setFilteredProducts, setSelectedProduct } from "@/redux/productSlice";
import { setSortBy } from "@/redux/sortBySlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const sortBy: string = useAppSelector(
    (state: any) => state?.dropdown?.sortBy
  );
  const cartProducts: Product[] = useAppSelector(
    (state: any) => state?.cart?.cartProducts
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);

  const addCartItems = async () => {
    const cartItems: any = await getCartItems();
    dispatch(setCartProducts(cartItems));
  };

  useEffect(() => {
    addCartItems();
  }, []);

  return (
    <nav className="bg-gray-900 border-gray-700 flex p-3 justify-between sm:justify-start sm:gap-20 items-center z-30">
      <Link href="/" className="text-white font-semibold sm:pl-10">
        ShopNew
      </Link>
      <div className="sm:hidden">
        {!hamburgerOpen ? (
          <GiHamburgerMenu
            className="text-white"
            onClick={() => setHamburgerOpen(true)}
          />
        ) : (
          <IoMdClose
            className="text-white"
            onClick={() => setHamburgerOpen(false)}
          />
        )}
        {hamburgerOpen && (
          <div className="absolute top-10 left-0 bg-gray-900 border-gray-700 flex flex-col items-center p-3 gap-2 w-full">
            <div className="flex justify-between w-full items-center">
              <button
                className="text-red-700 w-max font-semibold hover:cursor-pointer"
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </button>
              <Link
                className="flex gap-3 items-center justify-between"
                href="/cart"
              >
                <FaShoppingCart color="white" />
                <p className="text-white">{cartProducts.length}</p>
              </Link>
            </div>
            <div className="relative flex flex-col items-center w-[200px] rounded-lg">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="bg-blue-400 p-2 w-full flex items-center justify-between font-bold text-[15px] rounded-lg"
              >
                {sortBy}
              </button>
              {isOpen && (
                <div className="absolute top-[2.5rem] flex flex-col items-start w-full gap-[1px]">
                  {list.map((item: string, index: number) => (
                    <p
                      key={index}
                      className="bg-blue-400 rounded-lg p-2 w-full border border-black font-semibold hover:cursor-pointer"
                      onClick={() => {
                        setIsOpen((prev) => !prev);
                        dispatch(setSortBy(item));
                        dispatch(setFilteredProducts([]));
                        dispatch(setSelectedProduct(""));
                        setHamburgerOpen(false);
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="hidden sm:flex gap-20 items-center">
        <button
          className="text-red-700 w-max font-semibold hover:cursor-pointer"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </button>
        <Link className="flex gap-3 items-center justify-between" href="/cart">
          <FaShoppingCart color="white" />
          <p className="text-white">{cartProducts.length}</p>
        </Link>
      </div>
      <div className="hidden sm:flex relative flex-col items-center w-[200px] rounded-lg">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-blue-400 p-2 w-full flex items-center justify-between font-bold text-[15px] rounded-lg"
        >
          {sortBy}
        </button>
        {isOpen && (
          <div className="absolute top-[2.5rem] flex flex-col items-start w-full gap-[1px] z-40">
            {list.map((item: string, index: number) => (
              <p
                key={index}
                className="bg-blue-400 rounded-lg p-2 w-full border border-black font-semibold hover:cursor-pointer"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                  dispatch(setSortBy(item));
                  dispatch(setFilteredProducts([]));
                  dispatch(setSelectedProduct(""));
                }}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
