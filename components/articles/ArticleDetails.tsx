import React from 'react'

import { Article } from 'hooks/useArticles'

const ArticleDetails = ({ article }: { article: Article }) => {
  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.dateCreated.toString()}</p>
      <p>{article.content}</p>
    </>
  )
}
export default ArticleDetails
