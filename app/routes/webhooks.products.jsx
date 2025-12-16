import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
    const { topic, payload } = await authenticate.webhook(request);

    console.log("Product updated:", payload.id);

    return new Response(null, { status: 200 });
};
