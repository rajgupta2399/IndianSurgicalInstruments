"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import banner1 from "../../assets/banner1.webp";
import banner2 from "../../assets/banner2.webp";
import Autoplay from "embla-carousel-autoplay";

const Banners = () => {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="flex h-28 w-full items-center justify-center bg-secondary md:h-60">
            <Image
              src={banner1}
              alt="Banner 1"
              className="h-full w-full rounded-xl object-cover"
              priority
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex h-28 w-full items-center justify-center bg-secondary md:h-60">
            <Image
              src={banner2}
              alt="Banner 2"
              className="h-full w-full rounded-xl object-cover"
              priority
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex h-28 w-full items-center justify-center bg-secondary md:h-60">
            <Image
              src={
                "https://d29azk3rh443yy.cloudfront.net/static/Banner/Category/baby_care_0xIKnzv.jpg"
              }
              alt="Banner 2"
              unoptimized
              className="h-full w-full rounded-xl object-fill"
              priority
              width={100}
              height={100}
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Banners;
