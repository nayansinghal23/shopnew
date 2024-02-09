import { getProductsByCategories } from "@/actions/product";
import { categories } from "@/constants";
import { setFilteredProducts, setSelectedProduct } from "@/redux/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const HorizontalScrollBar = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(
    (state: any) => state?.product?.selectedProduct
  );
  const slideLeft = () => {
    let slider: any = document.getElementById("slider");
    slider.scrollLeft = slider?.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider: any = document.getElementById("slider");
    slider.scrollLeft = slider?.scrollLeft + 500;
  };

  const handleClick = async (item: string) => {
    dispatch(setSelectedProduct(item));
    const filteredProducts = await getProductsByCategories(item);
    dispatch(setFilteredProducts(filteredProducts));
  };

  return (
    <div className="relative flex items-center">
      <MdChevronLeft size={40} onClick={slideLeft} className="cursor-pointer" />
      <div
        id="slider"
        className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth overflow-y-hidden scrollbar-hide"
      >
        {categories.map((item: string, index: number) => (
          <p
            key={index}
            className={`inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 ${
              selectedProduct === item &&
              "bg-slate-500 rounded-lg font-semibold"
            }`}
            onClick={() => {
              handleClick(item);
            }}
          >
            {item}
          </p>
        ))}
      </div>
      <MdChevronRight
        size={40}
        onClick={slideRight}
        className="cursor-pointer"
      />
    </div>
  );
};

export default HorizontalScrollBar;
