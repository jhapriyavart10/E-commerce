export const getProductQuery = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      productType
      descriptionHtml

      # Fetch Review Rating (Example namespace: "reviews")
      rating: metafield(namespace: "reviews", key: "rating") {
        value
      }
      # Fetch Review Count
      reviewCount: metafield(namespace: "reviews", key: "rating_count") {
        value
      }
      # Fetch actual review list if stored as a JSON metafield
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
          gender: metafield(namespace: "shopify", key: "target-gender") {
            references(first: 5) {
              edges {
                node {
                  ... on Metaobject {
                    handle
                    field(key: "label") { # Directly get the 'For Him' label
                      value
                    }
                  }
                }
              }
            }
          }

          # 2. Material check (using references plural because it's a list)
         material: metafield(namespace: "shopify", key: "jewelry-material") {
          references(first: 5) {
            edges {
              node {
                ... on Metaobject {
                  field(key: "label") { value } # Or key: "name"
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