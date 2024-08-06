import React from 'react'

import { useArticles } from 'hooks/useArticles'

import ArticleListItem from './ArticleListItem'

const ArticleList = () => {
  const { articles } = useArticles()

  if (articles === null) return 'Loading...'

  return (
    <div className='article-list'>
      {articles?.map(article => (
        <ArticleListItem
          key={article.id}
          article={article}
          inProgress={false}
        />
      ))}
    </div>
  )
}
export default ArticleList
