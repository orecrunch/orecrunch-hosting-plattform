"use server";

import { Product } from "@/models/ui-product";
import { stripe} from "@/utils/stripe/server";
import Stripe from "stripe";


export default async function GetProducts(): Promise<Product[]> {
  const { data } = await stripe.products.list({
    active: true,
  });

  return data
    .map((product) => {
      const defaultPrice = product.default_price;

      if ( defaultPrice == null) return; 


      return {
        Id: product.id,
        Name: product.name,
        DefaultPrice: typeof defaultPrice === "string" ? defaultPrice : (defaultPrice as Stripe.Price).id,
        Description: product.description || "",
      };
    })
    .filter((product): product is Product => product !== null);
}
