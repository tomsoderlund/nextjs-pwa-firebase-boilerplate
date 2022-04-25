import React, { useState } from 'react'

import showNotification from 'lib/showNotification'
import { useProducts } from 'hooks/products'

import { Form, Button } from 'react-bootstrap';

const DEFAULT_INPUTS = { 
  name: '',
  type: '',
}

const useAddProductForm = () => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS)
  const { addProduct } = useProducts()
  const [inProgress, setInProgress] = useState(false)

  const handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value
    setInputs({ ...inputs, [target.name]: value })
  }

  const handleSubmit = async (event) => {
    if (event) event.preventDefault()
    setInProgress(true)
    const notificationId = showNotification('Criando novo produto...')
    await addProduct(inputs)
    // Clear input form when done
    setInputs(DEFAULT_INPUTS)
    setInProgress(false)
    showNotification('Produto criado', 'success', { notificationId }
    )
  }

  return { inputs, inProgress, handleInputChange, handleSubmit }
}

const AddProductForm = () => {
  const { inputs, inProgress, handleInputChange, handleSubmit } = useAddProductForm()
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nome do produto</Form.Label>
        <Form.Control name='name' type='text' onChange={handleInputChange} required />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Tipo do produto</Form.Label>
        <Form.Control name='type' type='text' onChange={handleInputChange} required />
      </Form.Group>

      <Button
        type='submit'
        className={'progress-animation' + (inProgress ? ' in-progress' : '')}
        disabled={inProgress}
      >
        Add product
      </Button>

    </Form>
  )
}
export default AddProductForm
