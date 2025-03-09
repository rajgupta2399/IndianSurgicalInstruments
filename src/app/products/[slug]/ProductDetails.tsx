"use client";

import WixImage from "@/components/_components/WixImage";
import { products } from "@wix/stores";

interface ProductDetailsProps {
  product: products.Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <>
      <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
        <div>
          <WixImage
            mediaIdentifier={product.media?.mainMedia?.image?.url}
            alt={product.media?.mainMedia?.image?.altText}
            width={1000}
            height={1000}
            className="sticky top-0"
          />
        </div>
      </div>
    </>
  );
}
