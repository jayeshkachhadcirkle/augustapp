import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
    const { topic, shop, payload } = await authenticate.webhook(request);

    console.log("Discount webhook:", topic, payload.id);

    // TODO:
    // fetch discountNode via Admin GraphQL
    // map products
    // store in DB

    return new Response(null, { status: 200 });
};
