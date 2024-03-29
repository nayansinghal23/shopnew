"use client";
import HorizontalScrollBar from "@/components/HorizontalScrollBar";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import SessionProvider from "@/components/SessionProvider";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <SessionProvider>
      <Provider store={store}>
        <div className="flex flex-col h-full min-h-screen gap-[1px]">
          <Navbar />
          <HorizontalScrollBar />
          <Products />
        </div>
      </Provider>
    </SessionProvider>
  );
}
