import ProductItem from "./ProductItem";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductListProp } from "@/lib/type";

const ProductList = ({ title, list, emptyMessage }: ProductListProp) => {
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

      {list.length === 0 ? (
        <p className="text-muted-foreground bg-white rounded-lg border-2 py-20 text-xl">
          {emptyMessage || "No products found"}
        </p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8 px-4"
          role="list"
          aria-label="List of products"
        >
          {list.map((product) => (
            <div key={product.id} role="listitem">
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// Loading skeleton component
ProductList.Skeleton = function ProductListSkeleton() {
  return (
    <div className="text-center">
      <Skeleton className="h-9 w-3/4 mx-auto my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8 px-4">
        {Array.from({ length: 6 }).map((_, i) => (
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

export default ProductList;
