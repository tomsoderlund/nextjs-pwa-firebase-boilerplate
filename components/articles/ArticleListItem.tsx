import Link from 'next/link'

import showNotification from 'lib/showNotification'
import { Article, useArticles, articlePath } from 'hooks/useArticles'

interface ArticleListItemProps {
  article: Article
  inProgress: boolean
}

const ArticleListItem = ({ article, inProgress = false }: ArticleListItemProps) => {
  const promptAndUpdateArticle = usePromptAndUpdateArticle(article, 'title')
  const promptAndDeleteArticle = usePromptAndDeleteArticle(article)

  return (
    <div
      className={'article' + (inProgress ? ' in-progress' : '')}
      title={`id: ${article.id}`}
    >
      <Link legacyBehavior {...articlePath(article)}>
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
          background-color: rgba(0,0,0, 0.1);
          padding: 0.5em;
          border-radius: 0.5em;
        }
        a.update {
          color: limegreen;
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

const usePromptAndUpdateArticle = (article: Article, fieldName: keyof Article) => {
  const { updateArticle } = useArticles()

  const handleUpdate = async () => {
    const newValue = window.prompt(`New value for ${fieldName}?`, article[fieldName] as string)
    if (newValue !== null) {
      const notificationId = showNotification('Updating article...')
      await updateArticle?.({
        id: article.id,
        [fieldName]: (newValue === '' ? null : newValue)
      })
      showNotification('Article updated', 'success', { notificationId })
    }
  }

  return handleUpdate
}

const usePromptAndDeleteArticle = (article: Article) => {
  const { deleteArticle } = useArticles()

  const handleDelete = async () => {
    if (window.confirm(`Delete ${article.title}?`)) {
      const notificationId = showNotification('Deleting article...')
      await deleteArticle?.(article.id)
      showNotification('Article deleted', 'success', { notificationId })
    }
  }

  return handleDelete
}
