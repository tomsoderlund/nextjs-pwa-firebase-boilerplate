import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { productObject } from 'hooks/products'

import ProductDetails from 'components/products/ProductDetails'

function ProductDetailsPage ({ product }) {
  // Note: 'query' contains both /:params and ?query=value from url
  const { query } = useRouter()
  return (
    <>
      {product && (
        <ProductDetails
          product={product}
        />
      )}

      <h2>Routing</h2>
      <p>Current query: <strong>{JSON.stringify(query)}</strong></p>

      <ul>
        <li><Link href='/'><a>Home</a></Link></li>
      </ul>
    </>
  )
}

export default ProductDetailsPage

const getProductProps = async (slug) => {
  const productId = slug.split('-').pop()
  const product = await productObject(productId)
  if (product.dateCreated) product.dateCreated = product.dateCreated.toDate().toString() // To avoid “cannot be serialized as JSON” error
  if (product.dateUpdated) product.dateUpdated = product.dateUpdated.toDate().toString()
  return {
    product
  }
}

// SSG
export async function getStaticProps ({ params: { slug }, locale = 'en' }) {
  return {
    props: await getProductProps(slug),
    revalidate: 60 // Seconds. This refresh time could be longer depending on how often data changes.
  }
}

export async function getStaticPaths ({ locales }) {
  // const paths = (await productsCollection()).map(product => ({ params: { slug: getProductSlug(product) }, locale: 'en' }))
  return {
    paths: [
      // { params: { propNameThatMustBePartOfFolderStructure: 'value' }, locale: 'en' }
    ],
    fallback: true // true -> build page if missing, false -> serve 404
  }
}

// SSR
// export async function getServerSideProps ({ req, res, query: { slug } }) {
//   return {
//     props: await getProductProps(slug)
//   }
// }
