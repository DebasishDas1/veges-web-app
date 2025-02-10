import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { footerLinks } from "@/lib/links";
import { whyChooseUs } from "@/lib/bin/info";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0 flex-1 md:pr-20">
            Veges is a trusted supplier of high-quality wholesale ingredients
            for Chinese and Biryani restaurants across Kolkata and beyond. We
            offer a wide range of products, including spices, rice, Biryani
            essentials, and more – all delivered directly to your restaurant’s
            doorstep. Our commitment to freshness, authenticity, and competitive
            pricing makes us the go-to choice for restaurant owners and chefs.
            <h2 className="text-lg font-bold my-6">Why Choose Us?</h2>
            <Accordion type="single" collapsible>
              {whyChooseUs.map((item) => (
                <AccordionItem value={item.title} key={item.title}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex mt-4 items-center justify-center py-4">
          <Image src="/veges_logo.png" alt="Error" width={400} height={400} />
        </div>

        <p className="text-sm dark:text-gray-400 mt-5 w-full text-center">
          © {currentYear} Veges. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
