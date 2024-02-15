"use client";
import HorizontalScrollBar from "@/components/HorizontalScrollBar";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import { store } from "@/redux/store";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

interface Props {
  session: Session | null;
}

export default function Home({ session }: Props) {
  return (
    <SessionProvider session={session}>
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
