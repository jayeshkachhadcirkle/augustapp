import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
// import ClickCounter from '../components/ClickCounter.jsx';

import { Button } from '@shopify/polaris';
// import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  // =======================================
  const allCollectionsRes = await admin.graphql(`
    #graphql
        query GetCollections {
      collections(first: 10) {
        nodes {
          id
          title
          products(first: 100){
            nodes{
              id
              title
            }
          }
        }
      }
    }`);
  const allCollections = await allCollectionsRes.json();
  // console.log(allCollections)
  // =======================================

  const DiscountCodes = await admin.graphql(`
  {
    codeDiscountNodes(first: 10) {
      edges {
        node {
          id
          codeDiscount {
            ... on DiscountCodeBasic {
              title
              codes(first: 10) {
                edges {
                  node {
                    code
                    __typename
                  }
                }
              }
              summary
              startsAt
              endsAt
              status
            }
            ... on DiscountCodeBxgy {
              title
              codes(first: 10) {
                edges {
                  node {
                    code
                  }
                }
              }
              summary
              startsAt
              endsAt
              status
            }
            ... on DiscountCodeFreeShipping {
              title
              codes(first: 10) {
                edges {
                  node {
                    code
                  }
                }
              }
              summary
              startsAt
              endsAt
              status
            }
          }
        }
      }
    }
  }
    `);
  const allDiscountCodes = await DiscountCodes.json();

  console.log("All Dis Codes", JSON.stringify(allDiscountCodes, null, 2));

  const productsOnDiscount = await admin.graphql(
    `{
      codeDiscountNodes(first: 10) {
        edges {
          node {
            id
            codeDiscount {
              ... on DiscountCodeBasic {
                title
                summary
                startsAt
                endsAt
                status
                codes(first: 10) {
                  edges {
                    node {
                      code
                    }
                  }
                }
                customerGets {
                  items {
                    __typename
                    ... on DiscountProducts {
                      products(first: 10) {
                        edges {
                          node {
                            id
                            title
                          }
                        }
                      }
                    }
                    ... on DiscountCollections {
                      collections(first: 10) {
                        edges {
                          node {
                            id
                            title
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    `
  );
  const callProductsOnDiscount = await productsOnDiscount.json();


  return {
    collections: allCollections.data,
    discountCodes: allDiscountCodes.data,
    callProductsOnDiscount: callProductsOnDiscount.data,
  };
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];

  return {
    res: "ok",
  };
};


export default function Index() {
  const fetcher = useFetcher();
  const loaderData = useLoaderData();
  const shopify = useAppBridge();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  useEffect(() => {

    console.log("callProductsOnDiscount :", loaderData.callProductsOnDiscount);

  }, [shopify, loaderData]);

  // const [count, setCount] = useState(0);  

  // const incrementCount = () => {
  //   setCount(count + 1);   
  // };


  return (
    <s-page heading="Shopify app template">

      {/* <ClickCounter count={count} incrementCount={incrementCount} /> */}

      <s-section heading="Custom Query Data">
        <h1>Discount Code</h1>
        {/* <p>Collections: {JSON.stringify(loaderData, 2, null)}</p> */}
        {/* <p>Collections: {loaderData?.collections.collections.nodes[0].title}</p> */}
        {loaderData?.discountCodes?.codeDiscountNodes?.edges?.map(({ node }) => {
          const id = node.id;
          const title = node.codeDiscount.title;
          const code = node.codeDiscount.codes.edges[0]?.node.code;

          return (
            <div key={id} style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '7px' }}>
              <s-paragraph><strong>ID:</strong> {id}</s-paragraph>
              <s-paragraph><strong>Title:</strong> {title}</s-paragraph>
              <s-paragraph><strong>Code:</strong> {code}</s-paragraph>
            </div>
          );
        })}
      </s-section>

    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};