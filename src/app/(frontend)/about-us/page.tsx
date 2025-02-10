import { Timeline } from "@/components/Timeline";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import { Handshake, Star, PartyPopper } from "lucide-react";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "About Veges | Organic Spices & Groceries Sourced Ethically",
  description:
    "Discover Veges’ farm-to-kitchen journey! We deliver 100% natural spices, groceries, and staples while empowering Indian farmers. Join our mission today.",
  exact: true,
});

export default function TimelineDemo() {
  const data = [
    {
      title: "Our Story",
      content: (
        <p className="pb-6 text-lg leading-relaxed">
          Veges was founded on the belief that food should be pure, natural, and
          sustainably produced. Our journey began with a vision to create a
          direct link between the farmer and your kitchen. Over the years, we
          have built a trusted network of local farmers who share our commitment
          to quality and ethical practices. Every product you receive tells a
          story of dedication and care.
        </p>
      ),
    },
    {
      title: "Our Impact",
      content: (
        <>
          <p className="pb-6 text-lg leading-relaxed">
            We take pride in the positive changes we’ve made in our community:
          </p>
          <div className="pb-6 flex flex-wrap justify-center gap-4">
            <Card className="p-4 flex flex-col items-center">
              <PartyPopper className="w-8 h-8 text-green-600" />
              <div className="text-2xl font-bold mt-2">500+</div>
              <div className="text-center">Farmers Supported</div>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <Star className="w-8 h-8 text-green-600" />
              <div className="text-2xl font-bold mt-2">100+</div>
              <div className="text-center">Organic Products</div>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <Handshake className="w-8 h-8 text-green-600" />
              <div className="text-2xl font-bold mt-2">20+</div>
              <div className="text-center">Years of Excellence</div>
            </Card>
          </div>
        </>
      ),
    },
    {
      title: "Our Mission",
      content: (
        <p className="pb-6 text-lg leading-relaxed">
          Our mission is simple: to make high-quality organic food accessible to
          everyone while empowering our local communities. We connect you
          directly with farmers who practice sustainable agriculture, ensuring
          that every purchase supports a healthier planet.
        </p>
      ),
    },
    {
      title: "Our Vision",
      content: (
        <>
          <p className="pb-6 text-lg leading-relaxed">
            We envision a future where the food you eat is not only a source of
            nourishment but also a celebration of nature’s bounty. At Veges, we
            aim to lead the way in ethical sourcing and sustainable practices,
            inspiring a new generation to appreciate the true value of natural,
            organic food.
          </p>
          <p className="pb-6 text-lg leading-relaxed">
            Join us on our journey towards a healthier, more sustainable future.
            At Veges, every spice, every grain, and every product is a step
            towards a better tomorrow.
          </p>
        </>
      ),
    },
  ];

  return (
    <MaxWidthWrapper>
      <Timeline data={data} />
    </MaxWidthWrapper>
  );
}
