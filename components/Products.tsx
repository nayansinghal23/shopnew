import { useAppSelector } from "@/redux/store";
import LoadMore from "./LoadMore";
import LowToHighPrice from "./LowToHighPrice";
import HighToLowPrice from "./HighToLowPrice";

const Products = () => {
  const sortBy: string = useAppSelector(
    (state: any) => state?.dropdown?.sortBy
  );

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
