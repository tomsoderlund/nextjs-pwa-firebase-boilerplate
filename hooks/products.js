/**
 * products module
 * @description Hooks for manipulating products data

Two different hooks: 1) one for lists of products, and 2) one for a specific product (commented out by default).

How to use the first:

Wrap your component/page with the ProductsContextProvider.
NOTE: must be wrapped on higher level than where useProducts is used.

  import { ProductsContextProvider } from 'hooks/products'

  <ProductsContextProvider
    products={products}
    onError={showErrorNotification}
  >
    ...
  </ProductsContextProvider>

Then to use (“consume”) inside component or hook:

  import { useProducts } from 'hooks/products'

  const { products, addProduct } = useProducts()
  await addProduct(data)

 */

import React, { createContext, useContext, useState, useEffect } from 'react'

import { firebase, firebaseDB, docWithId, getCollectionItems } from 'lib/data/firebase'
import toSlug from 'lib/toSlug'

// Tip: if you don’t need SSR, you can move these inside the ProductsContextProvider and create “chains” of child Firebase collections that depend on their parents
// Collection/Item as Firebase references
export const productsCollectionRef = () => firebaseDB.collection('products')
export const productRef = (productId) => productsCollectionRef().doc(productId)

// Collection/Item as objects
export const productsCollectionObjects = () => getCollectionItems(productsCollectionRef()) // Add .orderBy('dateCreated') to sort by date but only rows where dateCreated exists
export const productObject = async (productId) => {
  const productSnapshot = await productRef(productId).get()
  if (!productSnapshot.exists) {
    const notFoundError = new Error(`Not found: ${productId}`)
    notFoundError.code = 'ENOENT'
    throw notFoundError
  }
  return docWithId(productSnapshot)
}

export const getProductSlug = (product) => `${toSlug(product.title)}-${product.id}`

export const productPath = (product) => {
  return {
    href: `/products/${getProductSlug(product)}`
  }
}

// Example: extending the database with Comments
// export const commentsCollection = (productId) => productRef(productId).collection('comments')
// export const commentRef = (productId, commentId) => commentsCollection(productId).doc(commentId)

// ----- Products collection -----

export const ProductsContext = createContext()

export const ProductsContextProvider = (props) => {
  // Use State to keep the values. Initial values are obtained from ProductsContextProvider’s props.
  const [products, setProducts] = useState(props.products)

  // Real-time updates from Firebase
  useEffect(
    () => productsCollectionRef().onSnapshot(snapshot => productsCollectionObjects().then(setProducts)),
    []
  )

  // addProduct(variables)
  const addProduct = async (variables) => {
    // if (props.onError) props.onError('An error happened!')
    const valuesWithTimestamp = { ...variables, dateCreated: firebase.firestore.FieldValue.serverTimestamp() }

    // Create new product with a generated key
    const newProductRef = await productsCollectionRef().add(valuesWithTimestamp)

    // // Create new product with a specified key
    // const newProductRef = productRef(productId)
    // await newProductRef.set(valuesWithTimestamp)

    // Update client-side state
    const newProductSnapshot = await newProductRef.get()
    setProducts([
      ...products,
      docWithId(newProductSnapshot)
    ])
    return docWithId(newProductSnapshot)
  }

  
  // updateProduct(variables)
  const updateProduct = async (variables) => {
    const { id, ...values } = variables
    const valuesWithTimestamp = { ...values, dateUpdated: firebase.firestore.FieldValue.serverTimestamp() }
    await productRef(id).update(valuesWithTimestamp)
    // Update client-side state
    const productSnapshot = await productRef(id).get()
    setProducts(products.map(product => product.id === id ? docWithId(productSnapshot) : product))
    return docWithId(productSnapshot)
  }

  // deleteProduct(variables)
  const deleteProduct = async (variables) => {
    const { id } = variables
    await productRef(id).delete()
    // Update client-side state
    setProducts(products.filter(product => product.id !== id))
    return variables
  }

  // Make the context object (i.e. the “API” for Products)
  const productsContext = {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  }
  // Pass the value in Provider and return
  return <ProductsContext.Provider value={productsContext}>{props.children}</ProductsContext.Provider>
}

export const { Consumer: ProductsContextConsumer } = ProductsContext

export const useProducts = () => useContext(ProductsContext)

// ----- One Product -----
/*

export const ProductContext = createContext()

export const ProductContextProvider = (props) => {
  // Use State to keep the values. Initial values are obtained from ProductContextProvider’s props.
  const [product, setProduct] = useState(props.product)

  const thisProductRef = useMemo(
    () => productRef(props.product.id),
    [props.product.id]
  )

  // Real-time updates from Firebase
  useEffect(
    () => thisProductRef && thisProductRef.onSnapshot(snapshot => setProduct(docWithId(snapshot))),
    [thisProductRef]
  )

  // updateProduct(variables)
  const updateProduct = async (variables) => {
  }

  // deleteProduct(variables)
  const deleteProduct = async (variables) => {
  }

  // Make the context object (i.e. the “API” for Product)
  const productContext = {
    product,
    updateProduct,
    deleteProduct
  }
  // Pass the value in Provider and return
  return <ProductContext.Provider value={productContext}>{props.children}</ProductContext.Provider>
}

export const { Consumer: ProductContextConsumer } = ProductContext

export const useProduct = () => useContext(ProductContext)
*/
