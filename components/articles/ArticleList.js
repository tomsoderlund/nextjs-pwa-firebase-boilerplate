import React from 'react'

import { useArticles } from 'hooks/useArticles'

import ArticleListItem from './ArticleListItem'
import AddArticleForm from './AddArticleForm'

const ArticleList = () => {
  const { articles } = useArticles()

  if (!articles) return 'Loading...'

  return (
    <>
      <div className='article-list'>
        {articles && articles.map(article => (
          <ArticleListItem
            key={article.id}
            article={article}
          />
        ))}
      </div>

      <AddArticleForm />
    </>
  )
}
export default ArticleList
