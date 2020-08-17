import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

import { config } from 'config/config'
import { getCollectionItems } from 'lib/firebase'
import { articlesCollection, ArticlesContextProvider } from 'hooks/articles'
import useUser from 'hooks/useUser'

import Page from 'components/Page'
import ArticleList from 'components/articles/ArticleList'

function ArticleListPage ({ articles, router: { query, asPath } }) {
  // Note: 'query' contains both /:params and ?query=value from url
  const { user } = useUser()
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

      <h2>Log in (using Firebase Authentication)</h2>
      {user && (
        <p>You are logged in as <strong>{user.email}</strong></p>
      )}
      <Link href='/login'>
        <a>Click here to log in</a>
      </Link>

      <h2>Add to Home Screen</h2>
      <p>You can add this to your Home Screen on iOS/Android, it should then start full screen.</p>

      <h2>Source code</h2>
      <p>Get the <a target='_blank' rel='noopener noreferrer' href='https://github.com/tomsoderlund/nextjs-pwa-firebase-boilerplate'>source code for nextjs-pwa-firebase-boilerplate</a></p>
    </Page>
  )
}

export async function getServerSideProps ({ req, res, query }) {
  const articles = await getCollectionItems(articlesCollection()) // Add .orderBy('dateCreated') to sort by date but only rows where dateCreated exists
  return { props: { articles } }
}

export default withRouter(ArticleListPage)
