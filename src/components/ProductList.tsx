import ProductItem from "./ProductItem";
import { ProductListProp } from "@/lib/type";

const ProductList = ({ title, list, filter }: ProductListProp) => {
  // Filter the product list if a filter is provided, otherwise use the entire list.
  const filteredList = filter
    ? list.filter((item) => item.category === filter)
    : list;

  return (
    <div className="text-center">
      {/* Title Section */}
      <h2 className="font-bold text-5xl my-4 bg-gradient-to-br from-teal-400 to-lime-500 bg-clip-text text-transparent">
        {title}
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8 mx-4">
        {filteredList.map((item, index) => (
          // Pass each product item as props to the ProductItem component
          <ProductItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
