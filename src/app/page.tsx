// import { delay } from "@/lib/utils";
// import banner from "../assets/banner1.webp";
// import Image from "next/image";
import { Suspense } from "react";
import { getWixClient } from "@/lib/wix-client.base";
import Product from "@/components/_components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
// import Autoplay from "embla-carousel-autoplay";

// import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Banners from "@/components/_components/Banners";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-7xl space-y-5 px-5 py-10 sm:px-10">
        <Banners />
        <Suspense fallback={<LoadingSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </main>
    </>
  );
}

async function FeaturedProducts() {
  // await delay(1000);

  const wixClient = getWixClient();

  const { collection } =
    await wixClient.collections.getCollectionBySlug("featured-products");

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await wixClient.products
    .queryProducts()
    .hasSome("collectionIds", [collection._id])
    .descending("lastUpdated")
    .find();

  if (!featuredProducts.items.length) {
    return null;
  }
  return (
    <div className="relative space-y-3 overflow-hidden">
      <h2 className="text-xl font-bold sm:text-2xl sm:font-semibold">
        Featured Products
      </h2>

      <div className="relative mx-auto w-full max-w-screen-xl">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="flex">
            {featuredProducts.items.map((product) => (
              <CarouselItem
                key={product._id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <div className="h-full rounded-lg border p-1">
                  <Product product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Make sure buttons are visible and positioned */}
          <CarouselPrevious className="absolute top-1/2 z-10 -translate-y-1/2 sm:left-0" />
          <CarouselNext className="absolute top-1/2 z-10 -translate-y-1/2 sm:right-0" />
        </Carousel>
      </div>
      {/* <pre>{JSON.stringify(featuredProducts, null, 1)}</pre> */}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-5 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[15rem] w-full" />
      ))}
    </div>
  );
}
