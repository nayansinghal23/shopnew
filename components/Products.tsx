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

const Products = async () => {
  const products: Product[] = await getAllProducts();

  return (
    <div className="flex flex-col gap-2 overflow-x-hidden">
      {products?.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
