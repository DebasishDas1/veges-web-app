import ProductList from "@/components/ProductList";
import { getProductList } from "@/api/get-product";
import { constructMetadata } from "@/lib/utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ContainerScroll } from "@/components/ContainerScroll";
import Image from "next/image";

export const metadata = constructMetadata({
  title: "Whole Spices Online | Organic Cinnamon, Cardamom & More",
  description:
    "Discover 100% organic whole spices at Veges. Sourced directly from Indian farms for unmatched flavor. Shop cinnamon, cardamom, cloves & more!",
  keywords: [
    "buy whole spices online",
    "premium whole spices",
    "organic whole spices",
    "authentic whole spices India",
    "whole spices for cooking",
  ],
});

const SpiceWhole = async () => {
  const products = await getProductList({ filter: "spices-whole" });

  return (
    <>
      {/* hero section */}
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white text-center">
                Sourced from generations of skilled farmers, <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-transparent bg-clip-text">
                  Whole Spices
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`https://images.pexels.com/photos/5480247/pexels-photo-5480247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <MaxWidthWrapper className="text-center md:py-10 pb-6">
        Sourced from generations of skilled farmers, our whole spices bring you
        the purest flavors of India. Grown using traditional, sustainable
        methods, each spice is handpicked to preserve its authentic aroma, rich
        taste, and natural oils.
        <br />
        From cinnamon and cardamom to cloves and cumin, experience the heritage
        and purity of Indian spices in every dish! ✨
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <ProductList
          list={products}
          title="Bringing you the purest flavors of tradition. "
        />
      </MaxWidthWrapper>
    </>
  );
};

export default SpiceWhole;
