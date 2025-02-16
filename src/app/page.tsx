// import { delay } from "@/lib/utils";
import banner from "../assets/banner1.webp";
import Image from "next/image";
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

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-7xl space-y-5 px-5 py-10 sm:px-10">
        <div className="flex h-28 items-center bg-secondary md:h-64">
          <Image
            src={banner}
            alt="banner"
            className="h-full rounded-xl object-fill sm:object-cover"
          />
        </div>
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
      <h2 className="sm:text-2xl text-xl sm:font-semibold font-bold">Featured Products</h2>

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
                className="md:basis-1/3 lg:basis-1/5 basis-1/2"
              >
                <div className="h-full rounded-lg border p-1">
                  <Product product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Make sure buttons are visible and positioned */}
          <CarouselPrevious className="absolute sm:left-0 top-1/2 z-10 -translate-y-1/2" />
          <CarouselNext className="absolute sm:right-0 top-1/2 z-10 -translate-y-1/2" />
        </Carousel>
      </div>
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
