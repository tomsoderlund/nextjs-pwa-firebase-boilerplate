import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Navbar, Container } from 'react-bootstrap';

import { config } from 'config/config'
import { showErrorNotification } from 'lib/showNotification'
import { productsCollectionObjects, ProductsContextProvider } from 'hooks/products'
import useUser from 'hooks/useUser'

import ProductList from 'components/products/ProductList'

function ProductListPage ({ products }) {
  // Note: 'query' contains both /:params and ?query=value from url
  const { query } = useRouter()
  const { user } = useUser()

  if(user) {
    return (
        <Container>
            <p>You are logged in as <strong>{user.email}</strong></p>
            
            <ProductsContextProvider
                products={products}
                onError={showErrorNotification}
            >
                <ProductList />
            </ProductsContextProvider>
        </Container>
      )
  } else {
    return (
        <>
            <p>Forbiden Access</p>
        </>
    )
  }
}

export default ProductListPage

// SSG
export async function getStaticProps ({ params, locale = 'en' }) {
  const productsRaw = await productsCollectionObjects()
  const products = productsRaw.map(product => ({
    ...product,
    // To avoid “cannot be serialized as JSON” error:
    dateCreated: product.dateCreated ? product.dateCreated.toString() : null,
    dateUpdated: product.dateUpdated ? product.dateUpdated.toString() : null
  }))
  return {
    props: {
      products
    },
    revalidate: 60 // Seconds. This refresh time could be longer depending on how often data changes.
  }
}

// SSR
// export async function getServerSideProps ({ req, res, query: { slug } }) {
//   return {
//     products
//   }
// }
