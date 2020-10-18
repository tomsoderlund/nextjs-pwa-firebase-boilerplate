import Link from 'next/link'

import showNotification from 'lib/showNotification'
import { useArticles } from 'hooks/articles'

const usePromptAndUpdateArticle = (article, fieldName) => {
  const { updateArticle } = useArticles()

  const handleUpdate = async () => {
    const newValue = window.prompt(`New value for ${fieldName}?`, article[fieldName])
    if (newValue) {
      const notificationId = showNotification('Updating article...')
      const variables = {
        id: article.id,
        [fieldName]: newValue
      }
      await updateArticle({ variables })
      showNotification('Article updated', 'success', { notificationId })
    }
  }

  return handleUpdate
}

const usePromptAndDeleteArticle = (article) => {
  const { deleteArticle } = useArticles(article)

  const handleDelete = async () => {
    if (window.confirm(`Delete ${article.title}?`)) {
      const variables = {
        id: article.id
      }
      const notificationId = showNotification('Deleting article...')
      await deleteArticle({ variables })
      showNotification('Article deleted', 'success', { notificationId })
    }
  }

  return handleDelete
}

const toSlug = str => str && str.replace(/ /g, '-').replace(/[^\w-]+/g, '').toLowerCase()
const getArticleSlug = (article) => `${toSlug(article.title)}-${article.id}`

const ArticleListItem = ({ article, index, inProgress = false }) => {
  const promptAndUpdateArticle = usePromptAndUpdateArticle(article, 'title')
  const promptAndDeleteArticle = usePromptAndDeleteArticle(article)

  return (
    <div
      className={'article' + (inProgress === article.id ? ' in-progress' : '')}
      title={`id: ${article.id}`}
    >
      <Link
        href={`/articles/[article]?article=${getArticleSlug(article)}`}
        as={`/articles/${getArticleSlug(article)}`}
      >
        <a>{article.title}</a>
      </Link>

      <span className='actions'>
        <a
          className='action update'
          onClick={promptAndUpdateArticle}
        >
          Update
        </a>
        <a
          className='action delete'
          onClick={promptAndDeleteArticle}
        >
          Delete
        </a>
      </span>

      <style jsx>{`
        .article {
          margin: 0.3em 0;
        }

        a.action {
          margin-left: 0.5em;
          cursor: pointer;
          font-size: 0.6em;
          text-transform: uppercase;
          border-bottom: none;
        }
        a.update {
          color: lime;
        }
        a.delete {
          color: tomato;
        }

        a:hover {
          filter: brightness(70%);
        }

        .in-progress {
          opacity: 0.3;
        }
      `}
      </style>
    </div>
  )
}
export default ArticleListItem
