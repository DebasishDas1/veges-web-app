import MaxWidthWrapper from "./MaxWidthWrapper";
import { ProductCategory } from "@/lib/type";
import Link from "next/link";

const MegaMenu = ({ productList, description }: ProductCategory) => {
  return (
    <div className="absolute top-14 left-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-300">
      {/* Navbar content */}
      <div className="bg-white pt-10">
        <MaxWidthWrapper className="flex gap-24">
          {productList.map((category) => (
            <div key={category.title} className="flex-2">
              <h3 className="text-3xl font-bold mb-4">
                <Link href={category.href} className="hover:underline">
                  {category.title}
                </Link>
              </h3>
              {category.items && (
                <ul className="space-y-2 text-xl">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p className="text-sm font-light py-2 flex-1">{description}</p>
        </MaxWidthWrapper>
      </div>
      <div className="bg-gradient-to-b from-white to-transparent h-20" />
    </div>
  );
};

export default MegaMenu;
