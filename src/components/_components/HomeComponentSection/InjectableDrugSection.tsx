"use client";
import { useEffect, useState } from "react";
import { getWixClient } from "@/lib/wix-client.base";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductSection from "./ProductSection";
import Autoplay from "embla-carousel-autoplay";
import { ProductsQueryResult } from "@wix/stores_products"; // Import Wix types
import ID from "../../../assets/injectable_drugs.jpeg";
import Image from "next/image";
import Link from "next/link";
// import { ChevronRight } from "lucide-react";

// Skeleton Loader for better UX
function ProductSkeleton() {
  return (
    <div className="h-40 w-full animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
  );
}

export default function InjectableDrugsSection() {
  const [injectableDrugsProduct, setInjectableDrugsProduct] =
    useState<ProductsQueryResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const wixClient = getWixClient();
        const { collection } =
          await wixClient.collections.getCollectionBySlug("all-products");

        if (!collection?._id) {
          setLoading(false);
          return;
        }

        const products = await wixClient.products
          .queryProducts()
          .hasSome("collectionIds", [collection._id])
          .descending("lastUpdated")
          .find();

        setInjectableDrugsProduct(products);
      } catch (error) {
        console.error("Error fetching digital instruments: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="relative space-y-3 overflow-hidden">
        <h2 className="text-xl font-bold sm:text-2xl sm:font-semibold">
          Digital Instruments
        </h2>
        <div className="relative mx-auto w-full max-w-screen-xl">
          <Carousel className="w-full">
            <CarouselContent className="flex">
              {[...Array(5)].map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <ProductSkeleton />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    );
  }

  if (!injectableDrugsProduct?.items?.length) return null;

  return (
    <div className="relative space-y-4 overflow-hidden py-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold sm:text-2xl sm:font-semibold">
          Injectable Drugs
        </h2>
        {/* <div className="ml-auto flex items-center space-x-1">
          <h5 className="text-sm font-semibold">See All</h5>
          <ChevronRight className="text-xs h-4 mr-4" />
        </div> */}
      </div>

      <div className="digitalInstrument flex w-full">
        <div className="digitalInstrumentBanner1 w-full">
          <Link href={"/digitalInstruments"}>
            <Image
              src={ID}
              alt="digitalInstrument Banner"
              width={0}
              height={0}
              className="h-28 w-full rounded-lg sm:h-full"
            />
          </Link>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-screen-xl">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[Autoplay({ delay: 6000 })]}
          className="w-full"
        >
          <CarouselContent className="flex">
            {injectableDrugsProduct.items.map((product) => (
              <CarouselItem
                key={product._id!} // Using non-null assertion if sure _id exists
                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <div className="h-full rounded-lg border p-1">
                  <ProductSection product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute top-1/2 z-10 -translate-y-1/2 sm:left-0" />
          <CarouselNext className="absolute top-1/2 z-10 -translate-y-1/2 sm:right-0" />
        </Carousel>
      </div>
    </div>
  );
}
