import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface IData {
  price: number;
}

export const POST = async (request: NextRequest) => {
  try {
    const data: IData = await request.json();
    const session = await auth();
    const email = session?.user?.email;
    if (!email)
      return NextResponse.json({ error: "Email not found" }, { status: 401 });
    const name = session.user?.name;
    if (!name)
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    const customer = await stripe.customers.create({
      email,
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
      name,
    });
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      mode: "payment",
      success_url: "https://shopnew-pi.vercel.app/success",
      cancel_url: "https://shopnew-pi.vercel.app/cancel",
      line_items: [
        {
          quantity: 1,
          price_data: {
            product_data: {
              name: "Shopping Done!",
            },
            currency: "INR",
            unit_amount: data.price * 100,
          },
        },
      ],
    });
    return NextResponse.json(
      { data, url: checkoutSession.url },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
