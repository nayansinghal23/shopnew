"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "./Spinner";
import { getAllProducts } from "@/actions/product";
import ProductItem from "./ProductItem";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: String[];
}

const LoadMore = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState<number>(10);

  const { ref, inView } = useInView();

  const loadMoreProducts = async () => {
    const nextSkip: number = skip + 10;
    const newProducts: Product[] = await getAllProducts(skip);
    setProducts((prevProducts: Product[]) => [...prevProducts, ...newProducts]);
    setSkip(nextSkip);
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  return (
    <>
      {products?.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  );
};

export default LoadMore;
