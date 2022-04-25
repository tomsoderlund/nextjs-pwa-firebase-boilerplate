import React, { useState } from 'react'

import { useProducts } from 'hooks/products'

import ProductListItem from './ProductListItem'
import AddProductForm from './AddProductForm'

import { Container, Table, Modal, Button } from 'react-bootstrap';

const ProductList = () => {
  const { products } = useProducts()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  if (!products) return 'Loading...'

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Criar Novo
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Comandos</th>
          </tr>
        </thead>
        <tbody>
        {products && products.map(product => (
          <ProductListItem
            key={product.id}
            product={product}
          />
        ))}
        </tbody>
      </Table>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Novo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProductForm />
        </Modal.Body>
      </Modal>
      
    </Container>
  )
}
export default ProductList
