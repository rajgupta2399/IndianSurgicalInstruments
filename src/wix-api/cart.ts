import { getWixClient } from "@/lib/wix-client.base";

interface WixError {
  details: {
    applicationError: {
      code: string;
    };
  };
}

export async function getCart() {
  const wixClient = getWixClient();
  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch (error) {
    const wixError = error as WixError;
    if (wixError.details.applicationError.code === "OWNED_CART_NOT_FOUND") {
      return null;
    } else {
      throw error;
    }
  }
}