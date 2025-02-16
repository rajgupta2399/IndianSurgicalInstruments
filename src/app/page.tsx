// import { delay } from "@/lib/utils";
import banner from "../assets/banner1.webp";
import Image from "next/image";
import { Suspense } from "react";
import { getWixClient } from "@/lib/wix-client.base";
import Product from "@/components/_components/Product";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
        <div className="flex h-36 items-center bg-secondary md:h-72">
          <Image src={banner} alt="banner" className="h-full rounded-xl" />
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
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Featured Products</h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-6">
        {featuredProducts.items.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-10 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className=" h-25rem w-full" />
      ))}
    </div>
  );
}
