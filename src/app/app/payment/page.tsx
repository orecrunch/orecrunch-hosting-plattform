"use client";

import { Button } from "@/components/ui/button";

import { startTransition, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { Product } from "@/models/ui-product";
import GetProducts from "@/app/actions/get-products";
import { RedirectToStripe } from "@/app/actions/reditrect-to-stripe";
import { Skeleton } from "@/components/ui/skeleton";



export default function PaymentPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pending, setPending] = useState(false);

  function onPay(price: string) {
    setPending(true);
    startTransition(async () => {
      try {
        await RedirectToStripe(price);
      } catch (err: any) {
        toast.error(err.message || "Failed to redirect to Stripe");
      } finally {
        setPending(false);
      }
    });
  }


  useEffect(() => {
    GetProducts()
      .then((data) => setProducts(data))
      .catch((e) => toast(e.message));
  }, []);

  return (
    <>
      <Toaster />
      <div className="h-full flex justify-center items-center">
        {products?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {products.map((product) => (
              <Button
     
                variant="outline"
                key={product.Id}
                disabled={pending}
                onClick={() => onPay(product.DefaultPrice)}
              >
                {product.Name}
              </Button>
            ))}
          </div>
        ) : (
          <Skeleton className="w-2xl h-20 transition-opacity duration-500" />
        )}
      </div>
    </>
  );
}
