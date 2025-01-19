export const product_categories = [
  {
    label: "Rice",
    value: "rice" as const,
    featured: [
      {
        name: "Editor picks",
        href: `/products?category=ui_kits`,
        imageSrc: "/vegesLogo.png",
      },
    ],
  },
  {
    label: "Spices",
    value: "spices" as const,
    featured: [
      {
        name: "masala",
        href: `/masala`,
        imageSrc: "/spices.png",
      },
      {
        name: "New Arrivals",
        href: "/products?category=icons&sort=desc",
        imageSrc: "/spice_powder.png",
      },
    ],
  },
];
