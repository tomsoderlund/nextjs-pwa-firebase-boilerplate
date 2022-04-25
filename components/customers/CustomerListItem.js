import Link from 'next/link'


import showNotification from 'lib/showNotification'
import { useArticles, articlePath } from 'hooks/articles'

import { Button } from 'react-bootstrap';

const usePromptAndUpdateArticle = (article, fieldName) => {
  const { updateArticle } = useArticles()

  const handleUpdate = async () => {
    const newValue = window.prompt(`New value for ${fieldName}?`, article[fieldName])
    if (newValue !== null) {
      const notificationId = showNotification('Updating article...')
      await updateArticle({
        id: article.id,
        [fieldName]: (newValue === '' ? null : newValue)
      })
      showNotification('Article updated', 'success', { notificationId })
    }
  }

  return handleUpdate
}

const usePromptAndDeleteArticle = (article) => {
  const { deleteArticle } = useArticles(article)

  const handleDelete = async () => {
    if (window.confirm(`Delete ${article.title}?`)) {
      const notificationId = showNotification('Deleting article...')
      await deleteArticle({ id: article.id })
      showNotification('Article deleted', 'success', { notificationId })
    }
  }

  return handleDelete
}

const ArticleListItem = ({ article, index, inProgress = false }) => {
  const promptAndUpdateArticle = usePromptAndUpdateArticle(article, 'title')
  const promptAndDeleteArticle = usePromptAndDeleteArticle(article)

  return (
    <tr
      className={'article' + (inProgress === article.id ? ' in-progress' : '')}
      title={`id: ${article.id}`}
    >
      <td>
        <Link {...articlePath(article)}>
          <a>{article.title}</a>
        </Link>
      </td>
      <td className='actions'>
        <Button
          className='action update mr-1'
          onClick={promptAndUpdateArticle}
        >
          Editar
        </Button>
        <Button
          className='action delete'
          onClick={promptAndDeleteArticle}
        >
          Apagar
        </Button>
      </td>
    </tr>
  )
}
export default ArticleListItem
