import React from 'react'

import { useArticles } from 'hooks/articles'

import ArticleListItem from './ArticleListItem'
import AddArticleForm from './AddArticleForm'

const ArticleList = () => {
  const { articles } = useArticles()

  if (!articles) return 'Loading...'

  return (
    <>
      {articles && articles.map(article => (
        <ArticleListItem
          key={article.id}
          article={article}
        />
      ))}

      <AddArticleForm />
    </>
  )
}
export default ArticleList
