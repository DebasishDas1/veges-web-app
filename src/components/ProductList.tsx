import { memo, useMemo } from "react";
import ProductItem from "./ProductItem";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductListProp } from "@/lib/type";

const ProductList = ({ title, list, emptyMessage }: ProductListProp) => {
  const productItems = useMemo(
    () =>
      list.map((product) => (
        <div key={product.id} role="listitem">
          <ProductItem product={product} />
        </div>
      )),
    [list]
  );

  return (
    <section
      aria-labelledby="product-list-heading"
      className="text-center py-8"
    >
      <h2
        id="product-list-heading"
        className="font-bold text-3xl md:text-4xl lg:text-5xl my-4 text-green-700"
      >
        {title}
      </h2>

      {list.length ? (
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 px-4"
          role="list"
          aria-label="List of products"
        >
          {productItems}
        </div>
      ) : (
        <p className="text-gray-500 bg-white rounded-lg border py-16 text-lg">
          {emptyMessage || "No products found"}
        </p>
      )}
    </section>
  );
};

// Define Skeleton **before** memoizing
ProductList.Skeleton = function ProductListSkeleton() {
  return (
    <div className="text-center">
      <Skeleton className="h-9 w-3/4 mx-auto my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 px-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4 mt-4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mt-2 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ProductList);
