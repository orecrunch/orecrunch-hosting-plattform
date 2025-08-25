import provisionServer from "@/services/provision-server";
import { stripe } from "@/utils/stripe/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    if (!sig) throw new Error("Missing signature");
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.ENDPOINTSECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    try {
          const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.server_order_id;
    if (!orderId) {
      throw new Error("Failed to provision server");
    }
    await provisionServer(orderId)!;
    }catch (e) {
      console.error("Error provisioning server:", e);
      return NextResponse.json({
        status: 500,
        error: "Failed to provision server, see Console for further details!",
      })
    } 

  }

  return NextResponse.json({
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
