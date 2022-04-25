import React from 'react'


import { useArticles } from 'hooks/articles'

import ArticleListItem from './ArticleListItem'
import AddArticleForm from './AddArticleForm'

import { Container, Table } from 'react-bootstrap';

const ArticleList = () => {
  const { articles } = useArticles()

  if (!articles) return 'Loading...'

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Comandos</th>
          </tr>
        </thead>
        <tbody>
        {articles && articles.map(article => (
          <ArticleListItem
            key={article.id}
            article={article}
          />
        ))}
        </tbody>
      </Table>
      <AddArticleForm />
    </Container>
  )
}
export default ArticleList
