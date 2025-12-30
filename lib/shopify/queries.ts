export const getProductQuery = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      productType
      descriptionHtml

      gender: metafield(namespace: "custom", key: "target_gender") {
        reference {
          ... on Metaobject {
            handle
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
            handle
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
            price {
              amount
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

          gender: metafield(namespace: "custom", key: "target_gender") {
            reference {
              ... on Metaobject {
                handle
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
                handle
                fields {
                  key
                  value
                }
              }
            }
          }

          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }

          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;
