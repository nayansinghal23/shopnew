import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Spinner from "./Spinner";
import { getProductsSortedByPrice } from "@/actions/product";
import { useInView } from "react-intersection-observer";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: String[];
}

const HighToLowPrice = () => {
  const { ref, inView } = useInView();
  const [products, setProducts] = useState<Product[]>([]);
  const [slice, setSlice] = useState<number>(0);
  const fetchData = async () => {
    const newSlice: number = slice + 10;
    const data: Product[] = await getProductsSortedByPrice(
      "D",
      slice,
      newSlice
    );
    setProducts([...products, ...data]);
    setSlice(newSlice);
  };

  useEffect(() => {
    if (inView) {
      fetchData();
    }
  }, [inView]);

  return (
    <div className="flex flex-col gap-2">
      {products?.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        <Spinner />
      </div>
    </div>
  );
};

export default HighToLowPrice;
