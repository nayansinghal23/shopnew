import { getAllProducts } from "@/actions/product";
import ProductItem from "./ProductItem";
import LoadMore from "./LoadMore";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: String[];
}

const Products = async () => {
  const products: Product[] = await getAllProducts(0);

  return (
    <div className="flex flex-col gap-2 overflow-x-hidden">
      {products?.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      <LoadMore />
    </div>
  );
};

export default Products;
