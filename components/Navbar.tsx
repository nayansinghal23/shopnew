"use client";
import { list } from "@/constants";
import { setFilteredProducts } from "@/redux/productSlice";
import { setSortBy } from "@/redux/sortBySlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const sortBy: string = useAppSelector(
    (state: any) => state?.dropdown?.sortBy
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);

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
            <button
              className="text-red-700 w-max font-semibold hover:cursor-pointer"
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
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
      <button
        className="hidden sm:block text-red-700 font-semibold hover:cursor-pointer"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
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
