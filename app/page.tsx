"use client";
import HorizontalScrollBar from "@/components/HorizontalScrollBar";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex flex-col h-full min-h-screen gap-[1px]">
        <Navbar />
        <HorizontalScrollBar />
        <Products />
      </div>
    </Provider>
  );
}
