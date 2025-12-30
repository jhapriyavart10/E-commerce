export const getProductQuery = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      productType
      descriptionHtml
      
      gender: metafield(namespace: "shopify", key: "target_gender") {
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
          
          # 1. Gender check
          gender: metafield(namespace: "shopify", key: "Target_gender") {
            value
          }

          # 2. Material check (using references plural because it's a list)
          material: metafield(namespace: "shopify", key: "jewelry-material") {
            references(first: 5) {
              edges {
                node {
                  ... on Metaobject {
                    fields {
                      key
                      value
                    }
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