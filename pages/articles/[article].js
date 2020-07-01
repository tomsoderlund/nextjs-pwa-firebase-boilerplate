import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

import Page from '../../components/Page'
import ArticleDetails from '../../components/articles/ArticleDetails'

function ArticlePage ({ router: { query, asPath } }) {
  // Note: 'query' contains both /:params and ?query=value from url
  const { loading, data } = { data: { article: { title: 'Test' } } }
  return (
    <Page
      title={loading ? 'Loading...' : data.article.title}
      path={asPath}
    >
      {loading ? <div>Loading...</div> : (
        <ArticleDetails
          article={data.article}
        />
      )}

      <h2>Routing</h2>
      <p>Current query: <strong>{JSON.stringify(query)}</strong></p>

      <ul>
        <li><Link href='/'><a>Home</a></Link></li>
      </ul>
    </Page>
  )
}

export default withRouter(ArticlePage)
