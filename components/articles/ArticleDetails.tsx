import React from 'react'

const ArticleDetails = ({ article }) => {
  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.dateCreated}</p>
      <p>{article.content}</p>
    </>
  )
}
export default ArticleDetails
