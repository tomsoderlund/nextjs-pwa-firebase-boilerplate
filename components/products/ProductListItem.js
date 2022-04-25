import Link from 'next/link'

import showNotification from 'lib/showNotification'
import { useProducts, productPath } from 'hooks/products'

import { Button } from 'react-bootstrap';

const usePromptAndUpdateProduct = (product, fieldName) => {
  const { updateProduct } = useProducts()

  const handleUpdate = async () => {
    const newValue = window.prompt(`New value for ${fieldName}?`, product[fieldName])
    if (newValue !== null) {
      const notificationId = showNotification('Updating product...')
      await updateProduct({
        id: product.id,
        [fieldName]: (newValue === '' ? null : newValue)
      })
      showNotification('Product updated', 'success', { notificationId })
    }
  }

  return handleUpdate
}


const usePromptAndDeleteProduct = (product) => {
  const { deleteProduct } = useProducts(product)

  const handleDelete = async () => {
    if (window.confirm(`Delete ${product.name}?`)) {
      const notificationId = showNotification('Deleting product...')
      await deleteProduct({ id: product.id })
      showNotification('Product deleted', 'success', { notificationId })
    }
  }

  return handleDelete
}

const ProductListItem = ({ product, index, inProgress = false }) => {
  const promptAndUpdateProduct = usePromptAndUpdateProduct(product, 'name')
  const promptAndDeleteProduct = usePromptAndDeleteProduct(product)

  return (
    <tr
      className={'product' + (inProgress === product.id ? ' in-progress' : '')}
      title={`id: ${product.id}`}
    >
      <td>
        <Link {...productPath(product)}>
          <a>{product.name}</a>
        </Link>
      </td>
      <td className='actions'>
        <Button
          className='action update mr-1'
          onClick={promptAndUpdateProduct}
        >
          Editar
        </Button>
        <Button
          className='action delete'
          onClick={promptAndDeleteProduct}
        >
          Apagar
        </Button>
      </td>
    </tr>
  )
}
export default ProductListItem
