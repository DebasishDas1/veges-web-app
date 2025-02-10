"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Update the height measurement on mount and when the window resizes.
  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  // Animate the fill height and opacity based on scroll progress.
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full md:px-10 relative" ref={containerRef}>
      {/* Header Content */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 flex flex-col items-center">
        <h2 className="md:text-5xl text-3xl font-bold md:py-12 py-8 text-center">
          Welcome to Veges
        </h2>
        <p className="pb-10 text-stone-500 text-xl text-center">
          Organic Spices & Groceries Sourced Ethically
        </p>
        <p className="pb-6 text-lg leading-relaxed text-center">
          At Veges, our passion is to bring you the finest organic spices,
          groceries, and staples—directly from the heart of India. We work
          closely with local farmers to ensure that every product is not only
          naturally grown but also ethically sourced.
        </p>
      </div>

      {/* Timeline Entries */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Timeline bullet and desktop title */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 w-10 absolute left-3 md:left-3 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-lime-500 text-transparent bg-clip-text">
                {item.title}
              </h3>
            </div>

            {/* Mobile title and entry content */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-3xl mb-4 text-left font-bold bg-gradient-to-r from-teal-400 to-lime-500 text-transparent bg-clip-text">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Timeline Track */}
        <div
          style={{ height: `${height}px` }}
          className="absolute top-0 left-8 md:left-8 overflow-hidden w-[2px] bg-gray-300 dark:bg-gray-700"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[4px] bg-green-700 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
