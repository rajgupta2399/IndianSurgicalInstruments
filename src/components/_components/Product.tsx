import { formatCurrency } from "@/lib/utils";
import { products } from "@wix/stores";
import Link from "next/link";
import DiscountBadge from "./DiscountBadge";
import WixImage from "./WixImage";
import Badge from "../ui/badge";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <Link href={`/products/${product.slug}`} className="h-full  bg-card rounded-lg">
      <div className="relative overflow-hidden">
        <WixImage
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          width={300}
          height={300}
          className="transition-transform duration-300 hover:scale-105 rounded-lg"
        />
        <div className="absolute bottom-1 right-3 flex flex-wrap items-center gap-2">
          {product.ribbon && (
            <Badge className="rounded-md bg-gray-900 px-3 py-0.5 text-white shadow">
              {product.brand}
            </Badge>
          )}
          {product.discount && <DiscountBadge data={product.discount} />}
        </div>
      </div>
      <div className="space-y-3 p-3">
        <h3 className="text-sm line-clamp-2 font-semibold">{product.name}</h3>

        {/* Price displayed below product name */}
        <p className="text-sm font-semibold text-gray-600">
          <span className="pr-1 text-gray-900">
            {getFormattedPrice(product)}
          </span>
          {product?.price?.formatted?.price && (
            <span className="text-gray-500 line-through text-xs">
              {product.price.formatted.price}
            </span>
          )}
        </p>
        {/* <div
          className="line-clamp-5"
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        /> */}
      </div>
    </Link>
  );
}

function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "n/a"
    );
  }
}
