import React from 'react'


import { Container, Button } from 'react-bootstrap';

const ArticleDetails = ({ article }) => {
  return (
    <Container>
      <h1>{article.title}</h1>
      <p>{article.dateCreated}</p>
      <p>{article.content}</p>
    </Container>
  )
}
export default ArticleDetails
