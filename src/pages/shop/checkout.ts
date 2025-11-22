import type { APIRoute } from "astro";
import Stripe from "stripe";

export const prerender = false;

const STRIPE_SECRET_KEY = import.meta.env.STRIPE_SECRET_KEY;

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

type CheckoutPayload = {
    priceId?: string;
    quantity?: number;
    successUrl?: string;
    cancelUrl?: string;
    shippingCountries?: string[];
    clientReferenceId?: string;
    metadata?: Record<string, string>;
    customerEmail?: string;
};

const jsonResponse = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
        }
    });

export const POST: APIRoute = async ({ request }) => {
    if (!stripe) {
        console.error("Missing STRIPE_SECRET_KEY environment variable.");
        return jsonResponse(
            { error: "Server misconfiguration. Stripe is not available." },
            500
        );
    }

    let payload: CheckoutPayload;
    try {
        payload = await request.json();
    } catch {
        return jsonResponse({ error: "Invalid JSON payload." }, 400);
    }

    const {
        priceId,
        quantity = 1,
        successUrl,
        cancelUrl,
        shippingCountries,
        clientReferenceId,
        metadata,
        customerEmail
    } = payload;

    if (!priceId || typeof priceId !== "string") {
        return jsonResponse({ error: "Missing required priceId." }, 400);
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
        return jsonResponse(
            { error: "Quantity must be a positive integer." },
            400
        );
    }

    const urlFromRequest = new URL(request.url);
    const origin =
        request.headers.get("origin") ?? `${urlFromRequest.protocol}//${urlFromRequest.host}`;

    const normalizedCountries =
        Array.isArray(shippingCountries) && shippingCountries.length > 0
            ? shippingCountries.filter(
                  (code): code is Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry =>
                      typeof code === "string" && code.length === 2
              )
            : undefined;

    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [
                {
                    price: priceId,
                    quantity
                }
            ],
            allow_promotion_codes: true,
            success_url: successUrl ?? `${origin}/success`,
            cancel_url: cancelUrl ?? `${origin}/`,
            client_reference_id: clientReferenceId,
            customer_email: customerEmail,
            metadata,
            shipping_address_collection: normalizedCountries
                ? { allowed_countries: normalizedCountries }
                : undefined
        });

        return jsonResponse({ sessionId: session.id, url: session.url }, 200);
    } catch (error) {
        const message =
            error instanceof Stripe.errors.StripeError
                ? error.message
                : error instanceof Error
                  ? error.message
                  : "Unexpected error while creating checkout session.";
        console.error("Stripe checkout session error:", error);
        return jsonResponse({ error: message }, 500);
    }
};

export const GET: APIRoute = async () =>
    jsonResponse({ error: "Method not allowed." }, 405);

