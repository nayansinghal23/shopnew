"use client";
import Cart from "@/components/Cart";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const CartPage = () => {
  return (
    <Provider store={store}>
      <Cart />
    </Provider>
  );
};

export default CartPage;
