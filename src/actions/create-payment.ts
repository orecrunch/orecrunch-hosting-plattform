"use server";

import { randomUUID } from 'crypto'
import { stripe } from "@/utils/stripe/server";
import { createClient } from "@/utils/supabase/server";
import { createServiceClient } from "@/utils/supabase/service";
import { redirect } from "next/navigation";


export async function createPayment(price: string) {

  const client = await createClient();
  const serviceClient = createServiceClient();

  const { data: user, error } = await client.auth.getUser();

  if (error || !user.user) {
    throw new Error("Failed to get User");
  }

  const id = randomUUID();
  const checkout_session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    allow_promotion_codes: false,
    customer_email: user.user.email,
    line_items: [
      {
        price: price,
        quantity: 1,
      },
    ],
    mode: "subscription",
    metadata: {
      server_order_id: id
    }
  });

  if (!checkout_session.url) {
    throw new Error("Failed to create checkout session");
  }

  const { error: insertErr } = await serviceClient.from("server_orders").insert({
    id,
    user_id: user.user.id,
    server_node_id: "1aab3e84-5a25-4a43-834e-f7a6a8f207f8",
    stripe_session_id: checkout_session.id,
    threads: 2,
    ram_gb: 4,
  });
  

  if (insertErr) {
    console.error(insertErr);
    await stripe.checkout.sessions.expire(checkout_session.id);
    throw new Error("Failed to create order");
  }

 redirect(checkout_session.url);
}
