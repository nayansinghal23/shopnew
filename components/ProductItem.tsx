import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: String[];
}

interface ProductProps {
  product: Product;
}

const ProductItem = ({
  product: { id, title, description, price, thumbnail },
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
      <p className="font-semibold">Price : {price}Rs</p>
    </div>
  );
};

export default ProductItem;
