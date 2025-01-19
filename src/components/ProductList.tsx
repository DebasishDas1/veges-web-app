import ProductItem from "./ProductItem";
import { ProductListProp } from "@/lib/type";

const ProductList = ({ title, list }: ProductListProp) => {
  return (
    <div className="text-center">
      <h2 className="font-bold text-5xl my-4 bg-gradient-to-br from-teal-400 to-lime-500 bg-clip-text text-transparent">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8 mx-4">
        {list.map((item, index) => (
          <ProductItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
