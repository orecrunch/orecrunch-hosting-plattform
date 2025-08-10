"use server";

import { createStripeClient } from '@/utils/stripe/server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
const stripe = createStripeClient();

export async function RedirectToStripe(price : string) {
    const client = await createClient();

    const {data: user, error} = await client.auth.getUser();

    if (error || !(user.user)) {
        throw new Error('Failed to get User');
    }
    
    const checkout_session = await stripe.checkout.sessions.create({
        success_url: "http://localhost:3000/success",
        allow_promotion_codes: false,
        customer_email: user.user.email,
        line_items: [{
            price: price,
            quantity: 1,
        
        }],
        mode: "subscription"
    })

    if (!checkout_session.url) {
        throw new Error('Failed to create checkout session'); 
    }


  redirect(checkout_session.url);
}
