export const getProductQuery = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      productType
      descriptionHtml

      # Functional Metafields for Product Specifications
      careInstructions: metafield(namespace: "custom", key: "care_instructions") {
        value
      }
      productDetails: metafield(namespace: "custom", key: "product_details") {
        value
      }
      howToUse: metafield(namespace: "custom", key: "how_to_use") {
        value
      }

      # Existing Review & Rating Metafields
      rating: metafield(namespace: "reviews", key: "rating") {
        value
      }
      reviewCount: metafield(namespace: "reviews", key: "rating_count") {
        value
      }
      reviewList: metafield(namespace: "reviews", key: "list") {
        value
      }
      
      gender: metafield(namespace: "shopify", key: "target-gender") {
        reference {
          ... on Metaobject {
            fields {
              key
              value
            }
          }
        }
      }

      material: metafield(namespace: "shopify", key: "jewelry-material") {
        reference {
          ... on Metaobject {
            fields {
              key
              value
            }
          }
        }
      }

      images(first: 6) {
        edges {
          node {
            url
          }
        }
      }

      variants(first: 10) {
        edges {
          node {
            id
            title
            image {
              url
              altText
            }
            price {
              amount
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export const getProductsQuery = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          productType
          descriptionHtml
          
          # Added Specifications to Bulk Query
          careInstructions: metafield(namespace: "custom", key: "care_instructions") {
            value
          }
          productDetails: metafield(namespace: "custom", key: "product_details") {
            value
          }
          howToUse: metafield(namespace: "custom", key: "how_to_use") {
            value
          }

          gender: metafield(namespace: "shopify", key: "target-gender") {
            references(first: 5) {
              edges {
                node {
                  ... on Metaobject {
                    handle
                    field(key: "label") {
                      value
                    }
                  }
                }
              }
            }
          }

          material: metafield(namespace: "shopify", key: "jewelry-material") {
            references(first: 5) {
              edges {
                node {
                  ... on Metaobject {
                    field(key: "label") { value }
                  }
                }
              }
            }
          }

          images(first: 1) {
            edges { node { url } }
          }
          variants(first: 1) {
            edges { node { id price { amount } } }
          }
        }
      }
    }
  }
`;