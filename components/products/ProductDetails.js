import React from 'react'

import { Container, Button } from 'react-bootstrap';

const ProductDetails = ({ product }) => {
  return (
    <Container>
      <h1>{product.name}</h1>
      <p>{product.type}</p>
      <p>{product.content}</p>
    </Container>
  )
}
export default ProductDetails

