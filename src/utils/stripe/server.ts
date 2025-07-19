import Stripe from "stripe";

export function createStripeClient() {
return new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string)
}