import { Product } from "@/interface/types";
import Image from "next/image";

interface ProductProps {
  product: Product;
}

const ProductItem = ({
  product: { id, title, description, price, thumbnail, rating },
}: ProductProps) => {
  return (
    <div className="p-2 border-2 border-black rounded-md bg-[#FCEEC0] text-black flex flex-col items-center gap-2">
      <Image
        src={thumbnail}
        alt={`item${id}`}
        width={100}
        height={100}
        className="w-auto h-auto"
      />
      <p className="text-[15px] sm:text-[18px] font-semibold">{title}</p>
      <p>{description}</p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
        <p className="font-semibold">Price : {price}Rs</p>
        <p className="font-semibold">Rating : {rating}</p>
      </div>
    </div>
  );
};

export default ProductItem;
