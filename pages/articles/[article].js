import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

import { docWithId } from 'lib/firebase'
import { articleRef } from 'hooks/articles'

import Page from 'components/Page'
import ArticleDetails from 'components/articles/ArticleDetails'

function ArticleDetailsPage ({ article, router: { query, asPath } }) {
  // Note: 'query' contains both /:params and ?query=value from url
  return (
    <Page
      title={!article ? 'Loading...' : article.title}
      description={!article ? '' : article.content}
      path={asPath}
    >
      {!article ? (
        <div>Loading...</div>
      ) : (
        <ArticleDetails
          article={article}
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

export async function getServerSideProps ({ req, res, query }) {
  const articleId = query.article.split('-').pop()
  const articleSnapshot = await articleRef(articleId).get()
  if (!articleSnapshot.exists) {
    const notFoundError = new Error(`Not found: ${articleId}`)
    notFoundError.code = 'ENOENT'
    throw notFoundError
  }
  const article = docWithId(articleSnapshot)
  return { props: { article } }
}

export default withRouter(ArticleDetailsPage)
