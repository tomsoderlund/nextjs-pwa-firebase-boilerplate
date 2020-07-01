import React from 'react'
import { withRouter } from 'next/router'

import { config } from '../config/config'
import { firebaseDB, getCollectionItems } from '../lib/firebase'
import { ArticlesContextProvider } from '../hooks/articles'

import Page from '../components/Page'
import ArticleList from '../components/articles/ArticleList'

function ArticleListPage ({ articles, router: { query, asPath } }) {
  // Note: 'query' contains both /:params and ?query=value from url
  return (
    <Page
      title={undefined}
      path={asPath}
    >
      <h1>{config.appName}</h1>

      <p><em>{config.appTagline}</em></p>

      <ArticlesContextProvider articles={articles}>
        <ArticleList />
      </ArticlesContextProvider>

      <h2>Routing</h2>
      <p>Current query: <strong>{JSON.stringify(query)}</strong></p>

      <h2>Add to Home Screen</h2>
      <p>You can add this to your Home Screen on iOS/Android, it should then start full screen.</p>

      <h2>Source code</h2>
      <p>Get the <a target='_blank' rel='noopener noreferrer' href='https://github.com/tomsoderlund/nextjs-pwa-firebase-boilerplate'>source code for nextjs-pwa-firebase-boilerplate</a></p>
    </Page>
  )
}

export async function getServerSideProps ({ req, res, query }) {
  const articles = await getCollectionItems(firebaseDB.collection('articles'))
  return { props: { articles } }
}

export default withRouter(ArticleListPage)
