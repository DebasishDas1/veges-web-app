import ProductList from "@/components/ProductList";
import { getProductList } from "@/api/get-product";
import { constructMetadata } from "@/lib/utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ContainerScroll } from "@/components/ContainerScroll";
import Image from "next/image";

export const metadata = constructMetadata({
  title: "Organic Spice Powders Online | Turmeric, Chili, Coriander",
  description:
    "Shop 100% natural spice powders at Veges! Freshly ground turmeric, chili, cumin & garam masala. No additives, fast delivery. Free shipping on ₹499+.",
  keywords: [
    "organic turmeric powder online",
    "spicy Kashmiri chili powder",
    "fresh coriander powder India",
    "buy roasted cumin powder",
    "authentic garam masala powder",
  ],
});

const SpiceWhole = async () => {
  const products = await getProductList({ filter: "spices-powder" });

  return (
    <>
      {/* hero section */}
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white text-center">
                Freshly Ground for Bold Flavors <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-transparent bg-clip-text">
                  Organic Spice Powders
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
        At Veges, we bring you 100% natural spice powders crafted from
        sun-dried, premium whole spices. Skip the hassle of grinding – our
        turmeric, cumin, coriander, and chili powders are freshly milled,
        additive-free, and packed with vibrant color and aroma. Perfect for
        curries, marinades, soups, and home remedies!
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
