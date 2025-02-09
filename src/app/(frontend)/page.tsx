import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList from "@/components/ProductList";
import { homePageAdvantages } from "@/lib/bin/info";
import { getProductList } from "@/api/get-product";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import Advantage from "@/components/Advantage";
import { constructMetadata } from "@/lib/utils";

const HomeHeroSection = dynamic(() => import("@/components/HomeHeroSection"), {
  loading: () => <Skeleton className="h-[400px] w-full" />,
});

export const metadata = constructMetadata({
  title: "Fresh Premium Quality Spices & Groceries Online",
  description:
    "Veges delivers farm-fresh whole spices, daily essentials, snacks, teas & oils straight to your home. 100% natural, fast shipping, and trusted by thousands!",
  keywords: [
    "buy spices online",
    "organic groceries delivery",
    "daily essentials online store",
    "best whole spices India",
    "cold-pressed oils online",
    "Maggi bulk pack",
  ],
});

const Home = async () => {
  const products = await getProductList({});

  return (
    <>
      <HomeHeroSection />

      <MaxWidthWrapper>
        <ProductList list={products} title="Fresh Produce" />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="py-20">
        <Advantage advantages={homePageAdvantages} />
      </MaxWidthWrapper>
    </>
  );
};

export default Home;
