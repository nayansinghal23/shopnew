import { useAppSelector } from "@/redux/store";
import LoadMore from "./LoadMore";
import LowToHighPrice from "./LowToHighPrice";
import HighToLowPrice from "./HighToLowPrice";
import { Product } from "@/interface/types";
import ProductItem from "./ProductItem";

const Products = () => {
  const sortBy: string = useAppSelector(
    (state: any) => state?.dropdown?.sortBy
  );
  const filteredProducts: Product[] = useAppSelector(
    (state: any) => state?.product?.filteredProducts
  );

  if (filteredProducts.length !== 0) {
    return (
      <div className="flex flex-col gap-2 overflow-x-hidden">
        {filteredProducts.map((product: Product, index: number) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    );
  }

  if (sortBy === "Dropdown") {
    return (
      <div className="flex flex-col gap-2 overflow-x-hidden">
        <LoadMore />
      </div>
    );
  } else if (sortBy === "Low to High Price") {
    return (
      <div className="flex flex-col gap-2 overflow-x-hidden">
        <LowToHighPrice />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 overflow-x-hidden">
      <HighToLowPrice />
    </div>
  );
};

export default Products;
