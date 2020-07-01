import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

import { config } from '../config/config'
import { firebaseDB, getCollection } from '../lib/firebase'
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

      <ul>
        <li><Link href='/'><a>Home</a></Link></li>
      </ul>

      <p>Get the <a target='_blank' rel='noopener noreferrer' href='https://github.com/tomsoderlund/nextjs-pwa-firebase-boilerplate'>source code for nextjs-pwa-firebase-boilerplate</a></p>
    </Page>
  )
}

export async function getServerSideProps ({ req, res, query }) {
  const articles = await getCollection(firebaseDB.collection('articles'))
  return { props: { articles } }
}

export default withRouter(ArticleListPage)
