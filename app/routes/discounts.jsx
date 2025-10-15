// import { Router } from "express";
// import Shopify from "@shopify/shopify-api";

// const router = Router();

// router.get("/api/discounts", async (req, res) => {
//   const session = await Shopify.Utils.loadCurrentSession(req, res, true);

//   if (!session) {
//     return res.status(401).send("Unauthorized");
//   }

//   const { accessToken, shop } = session;

//   try {
//     const response = await fetch(`https://${shop}/admin/api/2025-10/price_rules.json`, {
//       method: "GET",
//       headers: {
//         "X-Shopify-Access-Token": accessToken,
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await response.json();
//     res.status(200).send(data);
//   } catch (error) {
//     console.error("Error fetching discounts:", error);
//     res.status(500).send("Failed to fetch discounts");
//   }
// });

// export default router;
